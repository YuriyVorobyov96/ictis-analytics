/* eslint-disable camelcase */
const AnalyticsMain = require('../models/analyticsMain');
const AnalyticsWebsite = require('../models/analyticsWebsite');
const VkPosts = require('../models/vkPosts');
const VkCollection = require('../models/vkCollection');
const VkMembersFriends = require('../models/vkMembersFriends');
const {
  scopes,
  CLIENT_EMAIL,
  PRIVATE_KEY,
  viewId,
  usernameVk,
  passwordVk,
} = require('../config/config');
const moment = require('moment');
const { google } = require('googleapis');
const request = require('request-promise');
const util = require('util');
const exec = util.promisify(require('child_process').execFile);
const easyvk = require('easyvk');
const array = require('lodash/array');
const fastcsv = require('fast-csv');
const fs = require('fs');

const FIX = 2;
const PERCENTS = 100;
const LIMIT = 30;
const TREE_SIZE = 100;
const RANDOM = 37;
const RANDOM_USERS = 10000000000;
const OFFSET = 1000;
const SLEEP = 1000;

const jwt = new google.auth.JWT(CLIENT_EMAIL, null, PRIVATE_KEY, scopes);

const analyticsreporting = google.analyticsreporting({
  version: 'v4',
  auth: jwt,
});

const calculateValueYesterday = (reports = [], query) => reports
  .filter((_, idx) => idx !== 0)
  .reduce((acc, el) => acc + el[query], 0);

const calculateValue = (reports = [], query) => reports.reduce((acc, el) => acc + el[query], 0);

const getMap = (reports = []) => {
  const daysReports = {};

  reports.forEach(report => {
    const date = moment(report.date).format('DD.MM.YYYY');

    if (date === moment().format('DD.MM.YYYY')) {
      return;
    }

    daysReports[date] = (report);
  });

  return daysReports;
};

const usersCounter = (field, query) => VkCollection
  .countDocuments({ [field]: query });

const compare = (a, b) => {
  const numA = a.number;
  const numB = b.number;

  let comparison = 0;

  if (numA > numB) {
    comparison = -1;
  } else if (numA < numB) {
    comparison = 1;
  }

  return comparison;
};

const compareReverse = (a, b) => {
  const numA = a.number;
  const numB = b.number;

  let comparison = 0;

  if (numA > numB) {
    comparison = 1;
  } else if (numA < numB) {
    comparison = -1;
  }

  return comparison;
};

const getCountMap = async(users, field) => {
  const fields = Array.from(new Set(users.map(u => u[field])));
  const usersCount = await VkCollection
    .countDocuments();

  return Promise.all(fields.filter(fd => fd).map(async f => ({
    label: f,
    number: await usersCounter(field, f),
    percent: Number(((await usersCounter(field, f) / usersCount) * PERCENTS).toFixed(FIX)),
  })));
};

module.exports = {
  async getGoogleYesterdayData() {
    const result = await analyticsreporting.reports.batchGet({
      requestBody: {
        reportRequests: [
          {
            viewId,
            dateRanges: [
              {
                startDate: 'yesterday',
                endDate: 'yesterday',
              },
            ],
            metrics: [
              { expression: 'ga:users' },
              { expression: 'ga:newUsers' },
              { expression: 'ga:sessions' },
              { expression: 'ga:pageviews' },
            ],
          },
        ],
      },
    });

    const yesterdayResults = await new AnalyticsMain({
      usersCount: result.data.reports[0].data.totals[0].values[0],
      newUsersCount: result.data.reports[0].data.totals[0].values[1],
      sessionsCount: result.data.reports[0].data.totals[0].values[2],
      pageViewsCount: result.data.reports[0].data.totals[0].values[3],
    }).save();

    return yesterdayResults;
  },
  async overviewYesterdayData() {
    const reports = await AnalyticsMain
      .find()
      .limit(LIMIT)
      .sort({ date: -1 });

    const yesterdayUsersCount = reports[0].usersCount;
    const totalUsersCount = calculateValueYesterday(reports, 'usersCount');
    const usersPerDay = (totalUsersCount / (reports.length - 1)).toFixed(0);
    const usersCountPercent = (((yesterdayUsersCount / usersPerDay) - 1) * PERCENTS).toFixed(FIX);

    const yesterdayNewUsersCount = reports[0].newUsersCount;
    const totalNewUsersCount = calculateValueYesterday(reports, 'newUsersCount');
    const newUsersPerDay = (totalNewUsersCount / (reports.length - 1)).toFixed(0);
    const newUsersCountPercent = (((yesterdayNewUsersCount / newUsersPerDay) - 1) * PERCENTS).toFixed(FIX);

    const yesterdaySessionsCount = reports[0].sessionsCount;
    const totalSessionsCount = calculateValueYesterday(reports, 'sessionsCount');
    const sessionsPerDay = (totalSessionsCount / (reports.length - 1)).toFixed(0);
    const sessionsCountPercent = (((yesterdaySessionsCount / sessionsPerDay) - 1) * PERCENTS).toFixed(FIX);

    const yesterdayPageViewsCount = reports[0].pageViewsCount;
    const totalPageViewsCount = calculateValueYesterday(reports, 'pageViewsCount');
    const pageViewsPerDay = (totalPageViewsCount / (reports.length - 1)).toFixed(0);
    const pageViewsCountPercent = (((yesterdayPageViewsCount / pageViewsPerDay) - 1) * PERCENTS).toFixed(FIX);

    return {
      usersCount: {
        yesterday: yesterdayUsersCount,
        compare: Math.abs(Number(usersPerDay)),
        percent: Math.abs(Number(usersCountPercent)),
        isHigher: Number(usersCountPercent) > 0,
      },
      newUsersCount: {
        yesterday: yesterdayNewUsersCount,
        compare: Math.abs(Number(newUsersPerDay)),
        percent: Math.abs(Number(newUsersCountPercent)),
        isHigher: Number(newUsersCountPercent) > 0,
      },
      sessionsCount: {
        yesterday: yesterdaySessionsCount,
        compare: Math.abs(Number(sessionsPerDay)),
        percent: Math.abs(Number(sessionsCountPercent)),
        isHigher: Number(sessionsCountPercent) > 0,
      },
      pageViewsCount: {
        yesterday: yesterdayPageViewsCount,
        compare: Math.abs(Number(pageViewsPerDay)),
        percent: Math.abs(Number(pageViewsCountPercent)),
        isHigher: Number(pageViewsCountPercent) > 0,
      },
    };
  },
  async analyticData() {
    const reports = await AnalyticsMain
      .find()
      .limit(LIMIT)
      .sort({ date: 1 });

    const reportsMap = getMap(reports);

    const averageUsers = Number((calculateValue(reports, 'usersCount') / Object.keys(reportsMap).length)
      .toFixed(0));
    const averageNewUsers = Number((calculateValue(reports, 'newUsersCount') / Object.keys(reportsMap).length)
      .toFixed(0));
    const averageSessions = Number((calculateValue(reports, 'sessionsCount') / Object.keys(reportsMap).length)
      .toFixed(0));
    const averagePageViews = Number((calculateValue(reports, 'pageViewsCount') / Object.keys(reportsMap).length)
      .toFixed(0));

    const chart = Object.keys(reportsMap).map(label => {
      const { usersCount, newUsersCount, sessionsCount, pageViewsCount } = reportsMap[label];

      return {
        label,
        usersCount,
        newUsersCount,
        sessionsCount,
        pageViewsCount,
      };
    });

    return {
      averageUsers,
      averageNewUsers,
      averageSessions,
      averagePageViews,
      chart,
    };
  },
  async vkData() {
    const vk = await easyvk({
      username: usernameVk,
      password: passwordVk,
    });

    const options = {
      uri: 'https://api.vk.com/method/wall.get',
      qs: {
        access_token: vk.session.access_token,
        owner_id: '-48632629',
        count: '30',
        v: '5.68',
      },
      headers: { 'User-Agent': 'Request-Promise' },
      json: true,
    };

    const postsRaw = await request(options);

    const posts = postsRaw.response.items.map(post => ({
      date: moment.unix(post.date).format(),
      postId: post.id,
      text: post.text,
      likesCount: post.likes.count,
      repostsCount: post.reposts.count,
      commentsCount: post.comments.count,
      viewsCount: post.views.count,
      url: `vk.com/wall${post.owner_id}_${post.id}`,
    }));

    const ws = fs.createWriteStream('posts.csv');

    fastcsv
      .write(Object.values(posts), { headers: true })
      .pipe(ws);

    await Promise.all([VkPosts.deleteMany(), VkPosts.collection.insertMany(posts)]);

    return posts;
  },
  async vkPostsAnalyticsData(query) {
    const sort = {};
    const finder = {};

    if (query.query || query.sort) {
      sort[query.query] = Number(query.sort);
    } else {
      sort.postId = 1;
    }

    if (query.id) {
      finder.postId = Number(query.id);
    }

    const postsData = await VkPosts
      .find(finder)
      .sort(sort);

    const result = postsData.map(post => ({
      id: post.postId,
      date: moment(post.date).format('DD.MM.YYYY, HH:mm:ss'),
      text: post.text,
      likesCount: post.likesCount,
      repostsCount: post.repostsCount,
      commentsCount: post.commentsCount,
      viewsCount: post.viewsCount,
      url: post.url,
    }));

    return result;
  },
  async vkUsersCollect() {
    const vk = await easyvk({
      username: usernameVk,
      password: passwordVk,
    });

    const offset = 0;

    let usersRaw;
    let totalCount;

    const usersData = [];

    const options = {
      uri: 'https://api.vk.com/method/groups.getMembers',
      qs: {
        access_token: vk.session.access_token,
        group_id: '48632629',
        sort: 'id_asc',
        offset,
        count: '1000',
        fields: 'sex,city,country,education,universities,lists,interests,age,is_closed',
        v: '5.107',
      },
      headers: { 'User-Agent': 'Request-Promise' },
      json: true,
    };

    const asyncFunc = async() => {
      while (true) {
        usersRaw = await request(options);

        totalCount = usersRaw.response.count;

        if (usersRaw.response.items.length) {
          usersData.push(usersRaw.response.items);

          if (usersRaw.response.items.length === OFFSET) {
            // eslint-disable-next-line require-atomic-updates
            options.qs.offset += OFFSET;
          } else {
            break;
          }
        } else {
          break;
        }
      }
    };

    const delay = async() => {
      const param = await asyncFunc();

      if (param) {
        console.log(true);
      }
    };

    await delay();

    const structuredUsersData = array.flatten(usersData).map(user => {
      const result = {
        id: user.id,
        isClosed: user.is_closed === false ? user.is_closed : true,
        firstName: user.first_name,
        lastName: user.last_name,
        sex: user.sex === 2 ? 'мужской' : user.sex === 1 ? 'женский' : '',
        city: user.city ? user.city.title : '',
        country: user.country ? user.country.title : '',
        universityMain: user.university_name || '',
        interests: user.interests ? user.interests.split(', ') : [],
        faculty: '',
        chairName: '',
        graduation: '',
        educationForm: '',
        educationStatus: '',
      };

      if (user.universities) {
        user.universities
          .filter(u => u.name === 'ИТА ЮФУ (бывш. ТТИ ЮФУ)')
          .forEach(uInfo => {
            result.faculty = uInfo.faculty_name || '';
            result.chairName = uInfo.chair_name || '';
            result.graduation = uInfo.graduation || '';
            result.educationForm = uInfo.education_form || '';
            result.educationStatus = uInfo.education_status || '';
          });
      }

      return result;
    });

    await Promise.all([VkCollection.deleteMany(), VkCollection.collection.insertMany(structuredUsersData)]);

    return { totalLength: structuredUsersData.length, totalCount, structuredUsersData };
  },
  async vkUsersFriends() {
    const vk = await easyvk({
      username: usernameVk,
      password: passwordVk,
    });

    const vkUsers = await VkCollection
      .find({}, `id firstName lastName isClosed -_id`)
      .limit(100);

    const offset = 0;

    const collector = async userId => {
      const options = {
        uri: 'https://api.vk.com/method/friends.get',
        qs: {
          access_token: vk.session.access_token,
          user_id: userId,
          sort: 'id_asc',
          offset,
          count: '5000',
          fields: 'first_name, last_name',
          v: '5.107',
        },
        headers: { 'User-Agent': 'Request-Promise' },
        json: true,
      };

      const info = await request(options);

      return { [userId]: info.response.items };
    };

    let timer = 0;

    const friends = await Promise.all(vkUsers.map(el => {
      if (el.isClosed) {
        return { [el.id]: [] };
      }

      return new Promise(resolve => setTimeout(() => resolve(collector(el.id)), timer += SLEEP));
    }));

    return new VkMembersFriends({ members: friends }).save();
  },
  async vkUsersFriendsTree(topUsers = 10) {
    const friends = await VkMembersFriends
      .find({}, `-_id`);

    const vkUsers = await VkCollection
      .find({}, `id firstName lastName -_id`)
      .limit(100);

    const nodesIds = {};
    const edgesIds = {};
    const allUsers = [];

    const membersIds = vkUsers.map(el => el.id);

    friends[0].members.forEach((el, idx) => {
      membersIds.forEach(el2 => {
        if (el2 === Number(Object.keys(friends[0].members[idx])[0])) {
          allUsers.push(friends[0].members[idx][el2]);
        }
      });
    });

    allUsers.push(vkUsers);

    const membersOnly = array.flatten(allUsers).filter(el => membersIds.includes(el.id));
    const counter = membersOnly.reduce((acc, el) => {
      acc[el.id] = (acc[el.id] || 0) + 1;

      return acc;
    }, {});

    const sorted = Object.keys(counter).map(el => ({
      key: el,
      number: counter[el],
    }))
      .sort(compare)
      .map(el2 => Number(el2.key));

    const top = vkUsers.filter(el => sorted.indexOf(el.id) < topUsers);
    const topIds = top.map(el => el.id);

    top.forEach((el, idx) => nodesIds[el.id] = {
      id: `n${idx}`,
      label: el.firstName ? `${el.id} | ${el.firstName} ${el.lastName}` : `${el.id} | ${el.first_name} ${el.last_name}`,
      x: Math.floor((Math.random() ** 2) * RANDOM_USERS * topUsers * (idx + 1)),
      y: Math.floor((Math.random() ** 2) * RANDOM_USERS * topUsers * (idx + 1)),
      size: TREE_SIZE,
      labelSize: 'fixed',
    });

    friends[0].members.forEach((el, idx) => {
      topIds.forEach(el2 => {
        if (el2 === Number(Object.keys(friends[0].members[idx])[0])) {
          friends[0].members[idx][el2].forEach(el3 => {
            edgesIds[`${Math.random()}`] = {
              id: `e${Math.random() * RANDOM}`,
              source: nodesIds[el2].id,
              target: nodesIds[el3.id] ? nodesIds[el3.id].id : nodesIds[el2].id,
              type: 'arrow',
            };
          });
        }
      });
    });

    const ws = fs.createWriteStream('nodes.csv');
    const ws2 = fs.createWriteStream('edges.csv');

    fastcsv
      .write(Object.values(nodesIds), { headers: true })
      .pipe(ws);

    fastcsv
      .write(Object.values(edgesIds), { headers: true })
      .pipe(ws2);

    const graph = {
      nodes: Object.values(nodesIds),
      edges: Object.values(edgesIds),
    };

    return graph;
  },
  async vkUsersAnalyticsTypeData(type) {
    const usersData = await VkCollection
      .find();

    switch (type) {
      case 'sex':
        const sexChart = await getCountMap(usersData, 'sex');

        return { sexChart: sexChart.sort(compare) };
      case 'universityMain':
        const universitiesChart = await getCountMap(usersData, 'universityMain');

        return { universitiesChart: universitiesChart.sort(compare) };
      case 'city':
        const cityChart = await getCountMap(usersData, 'city');

        return { cityChart: cityChart.sort(compare) };
      case 'country':
        const countryChart = await getCountMap(usersData, 'country');

        return { countryChart: countryChart.sort(compare) };
      case 'faculty':
        const facultyChart = await getCountMap(usersData, 'faculty');

        return { facultyChart: facultyChart.sort(compare) };
      case 'chairName':
        const chairChart = await getCountMap(usersData, 'chairName');

        return { chairChart: chairChart.sort(compare) };
      case 'graduation':
        const graduationChart = await getCountMap(usersData, 'graduation');

        return { graduationChart: graduationChart.sort(compare) };
      case 'educationForm':
        const educationFormChart = await getCountMap(usersData, 'educationForm');

        return { educationFormChart: educationFormChart.sort(compare) };
      case 'educationStatus':
        const educationStatusChart = await getCountMap(usersData, 'educationStatus');

        return { educationStatusChart: educationStatusChart.sort(compare) };
      default:
        return {
          sexChart: sexChart.sort(compare),
          universitiesChart: universitiesChart.sort(compare),
          cityChart: cityChart.sort(compare),
          countryChart: countryChart.sort(compare),
          facultyChart: facultyChart.sort(compare),
          chairChart: chairChart.sort(compare),
          graduationChart: graduationChart.sort(compare),
          educationFormChart: educationFormChart.sort(compare),
          educationStatusChart: educationStatusChart.sort(compare),
        };
    }
  },
  async vkUsersAnalyticsData() {
    const usersData = await VkCollection
      .find();

    const sexChart = await getCountMap(usersData, 'sex');
    const universitiesChart = await getCountMap(usersData, 'universityMain');
    const cityChart = await getCountMap(usersData, 'city');
    const countryChart = await getCountMap(usersData, 'country');
    const facultyChart = await getCountMap(usersData, 'faculty');
    const chairChart = await getCountMap(usersData, 'chairName');
    const graduationChart = await getCountMap(usersData, 'graduation');
    const educationFormChart = await getCountMap(usersData, 'educationForm');
    const educationStatusChart = await getCountMap(usersData, 'educationStatus');

    return {
      sexChart: sexChart.sort(compare),
      universitiesChart: universitiesChart.sort(compare),
      cityChart: cityChart.sort(compare),
      countryChart: countryChart.sort(compare),
      facultyChart: facultyChart.sort(compare),
      chairChart: chairChart.sort(compare),
      graduationChart: graduationChart.sort(compare),
      educationFormChart: educationFormChart.sort(compare),
      educationStatusChart: educationStatusChart.sort(compare),
    };
  },
  async vkUsersAnalyticsDataPython() {
    let sexCount;

    const {
      stdout,
      stderr,
    } = await exec('python3 "K:\\Юра Документы\\Stud doc\\Дисер\\ictis-analytics\\server\\services\\analytics.py"');

    console.log(
      sexCount = stdout,
      stderr,
    );

    return sexCount;
  },
  async vkUsersInterestsAnalyticsData() {
    const usersInterests = await VkCollection
      .find({}, 'interests');

    const interestsList = array.flatten(usersInterests.map(el => el.interests
      .map(el2 => el2.toLowerCase())).sort()).reduce((acc, el) => {
      acc[el] = (acc[el] || 0) + 1;

      return acc;
    }, {});

    const total = Object.values(interestsList).reduce((acc, el) => acc += el, 0);

    const words = Object.keys(interestsList).map(el => ({
      key: el,
      number: interestsList[el],
      percent: Number(((interestsList[el] / total) * PERCENTS).toFixed(FIX)),
    }))
      .sort(compare);

    return {
      total,
      pairs: words.length,
      words,
    };
  },
  async googleDataCollect() {
    const countries = await analyticsreporting.reports.batchGet({
      requestBody: {
        reportRequests: [
          {
            viewId,
            dateRanges: [
              {
                startDate: 'yesterday',
                endDate: 'yesterday',
              },
            ],
            dimensions: [{ name: 'ga:country' }],
            metrics: [{ expression: 'ga:users' }, { expression: 'ga:sessions' }],
          },
        ],
      },
    });
    const cities = await analyticsreporting.reports.batchGet({
      requestBody: {
        reportRequests: [
          {
            viewId,
            dateRanges: [
              {
                startDate: 'yesterday',
                endDate: 'yesterday',
              },
            ],
            dimensions: [{ name: 'ga:city' }],
            metrics: [{ expression: 'ga:users' }, { expression: 'ga:sessions' }],
          },
        ],
      },
    });
    const regions = await analyticsreporting.reports.batchGet({
      requestBody: {
        reportRequests: [
          {
            viewId,
            dateRanges: [
              {
                startDate: 'yesterday',
                endDate: 'yesterday',
              },
            ],
            dimensions: [{ name: 'ga:region' }],
            metrics: [{ expression: 'ga:users' }, { expression: 'ga:sessions' }],
          },
        ],
      },
    });
    const pages = await analyticsreporting.reports.batchGet({
      requestBody: {
        reportRequests: [
          {
            viewId,
            dateRanges: [
              {
                startDate: 'yesterday',
                endDate: 'yesterday',
              },
            ],
            dimensions: [{ name: 'ga:pageTitle' }, { name: 'ga:pagePath' }],
            metrics: [{ expression: 'ga:pageviews' }],
          },
        ],
      },
    });
    const counters = await analyticsreporting.reports.batchGet({
      requestBody: {
        reportRequests: [
          {
            viewId,
            dateRanges: [
              {
                startDate: 'yesterday',
                endDate: 'yesterday',
              },
            ],
            metrics: [
              { expression: 'ga:users' },
              { expression: 'ga:newUsers' },
              { expression: 'ga:sessions' },
              { expression: 'ga:pageviews' },
            ],
          },
        ],
      },
    });

    const result = await new AnalyticsWebsite({
      usersCount: counters.data.reports[0].data.totals[0].values[0],
      newUsersCount: counters.data.reports[0].data.totals[0].values[1],
      sessionsCount: counters.data.reports[0].data.totals[0].values[2],
      pageViewsCount: counters.data.reports[0].data.totals[0].values[3],
      pages: pages.data.reports[0].data.rows.map(el => ({
        title: el.dimensions[0],
        path: el.dimensions[1],
        number: el.metrics[0].values[0],
      })),
      countries: countries.data.reports[0].data.rows.map(el => ({
        name: el.dimensions[0],
        number: el.metrics[0].values[0],
      })),
      cities: cities.data.reports[0].data.rows.map(el => ({
        name: el.dimensions[0],
        number: el.metrics[0].values[0],
      })),
      regions: regions.data.reports[0].data.rows.map(el => ({
        name: el.dimensions[0],
        number: el.metrics[0].values[0],
      })),
    }).save();

    return result;
  },
  async googleDataSimple(params) {
    const query = {};
    const query2 = {};

    if (params.start) {
      query.date = { $gte: params.start };
    }

    if (params.end) {
      query.date = { $lte: params.end };
    }

    if (params.start && params.end) {
      query.date = { $gte: params.start, $lte: params.end };
    }

    const reports = await AnalyticsWebsite
      .find(query, `date ${params.type}`)
      .sort({ date: 1 });

    let sum;

    if (Date.parse(new Date(params.start)) > Date.parse(new Date())) {
      sum = 0;
    } else {
      if (params.start) {
        query2.date = { $gte: new Date(params.start) };
      }

      if (params.end) {
        query2.date = { $lte: new Date(params.end) };
      }

      if (params.start && params.end) {
        query2.date = { $gte: new Date(params.start), $lte: new Date(params.end) };
      }

      sum = await AnalyticsWebsite
        .aggregate([
          { $match: query2 },
          {
            $group: {
              _id: null,
              [params.type]: { $sum: `$${params.type}` },
            },
          },
        ]);
    }

    const reportsMap = getMap(reports);

    const chart = Object.keys(reportsMap).map(label => ({
      label,
      [`${params.type}`]: reportsMap[label][params.type],
    }));

    return {
      sum: sum.length ? sum[0][params.type] : 0,
      chart,
    };
  },
  async googleData(params) {
    const query = {};

    if (params.start) {
      query.date = { $gte: params.start };
    }

    if (params.end) {
      query.date = { $lte: params.end };
    }

    if (params.start && params.end) {
      query.date = { $gte: params.start, $lte: params.end };
    }

    const reports = await AnalyticsWebsite
      .find(query, `date ${params.type}`)
      .sort({ date: 1 });

    const dates = [];

    const reportsMap = getMap(reports);

    const chart = Object.keys(reportsMap).map(label => {
      dates.push(label);

      return {
        label,
        [`${params.type}`]: reportsMap[label][params.type],
      };
    });

    return {
      dates,
      chart,
    };
  },
  async googleDataPagesPath() {
    const pathInfo = await analyticsreporting.reports.batchGet({
      requestBody: {
        reportRequests: [
          {
            viewId,
            dateRanges: [
              {
                startDate: 'today',
                endDate: 'today',
              },
            ],
            dimensions: [
              { name: 'ga:previousPagePath' },
              { name: 'ga:pagePath' },
              { name: 'ga:pageTitle' },
            ],
            metrics: [{ expression: 'ga:pageviews' }],
          },
        ],
      },
    });

    const pathArray = pathInfo.data.reports[0].data.rows.map(el => el.dimensions);

    const pathArraySet = Array.from(new Set(pathArray));

    const nodesIds = {
      '(entrance)': {
        id: 'n0',
        label: '(entrance)',
        x: Math.floor(Math.random() * Math.random() * RANDOM),
        y: Math.floor(Math.random() * Math.random() * RANDOM),
        size: TREE_SIZE,
        labelSize: 'fixed',
      },
    };

    const nodesLabel = Array.from(new Set(pathArraySet.map(el => `${el[2]}(${el[1]})`)));
    const nodesPath = Array.from(new Set(pathArraySet.map(el => `${el[1]}`)));

    nodesPath.forEach((el, idx) => nodesIds[el] = {
      id: `n${idx + 1}`,
      label: nodesLabel[idx],
      x: Math.floor(Math.random() * Math.random() * RANDOM),
      y: Math.floor(Math.random() * Math.random() * RANDOM),
      size: TREE_SIZE,
      labelSize: 'fixed',
    });

    const edges = pathArraySet.map((el, idx) => ({
      id: `e${idx}`,
      source: nodesIds[el[0]].id,
      target: nodesIds[el[1]].id,
      type: 'arrow',
    }));

    const graph = {
      nodes: Object.values(nodesIds),
      edges,
    };

    return graph;
  },
  async googleDataPages(params = {}) {
    const query = {};
    const pagesByTitle = {};

    if (params.start) {
      query.date = { $gte: params.start };
    }

    if (params.end) {
      query.date = { $lte: params.end };
    }

    if (params.start && params.end) {
      query.date = { $gte: params.start, $lte: params.end };
    }

    const reports = await AnalyticsWebsite
      .find(query, `pages -_id`)
      .sort({ date: 1 });

    reports.forEach(el => {
      el.pages.forEach(el2 => {
        // eslint-disable-next-line no-unused-expressions
        pagesByTitle.hasOwnProperty([el2.path])
          ? pagesByTitle[el2.path].number += el2.number
          : pagesByTitle[el2.path] = {
            title: el2.title,
            path: el2.path,
            number: el2.number,
          };
      });
    });

    const pagesArray = Object.values(pagesByTitle);

    let pagesSortedArray;

    if (Number(params.sort) === -1) {
      pagesSortedArray = pagesArray.sort(compare);
    } else if (Number(params.sort) === 1) {
      pagesSortedArray = pagesArray.sort(compareReverse);
    } else {
      pagesSortedArray = pagesArray.sort(compare);
    }

    if (params.title) {
      const regex = new RegExp(params.title, 'giu');

      pagesSortedArray = pagesSortedArray.filter(el => el.title.match(regex));
    }
    if (params.path) {
      const regex = new RegExp(params.path, 'giu');

      pagesSortedArray = pagesSortedArray.filter(el => el.path.match(regex));
    }

    return pagesSortedArray;
  },
};
