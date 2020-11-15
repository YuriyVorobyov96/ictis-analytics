const httpStatus = require('http-status-codes');
const analyticsService = require('../services/analyticsService');

module.exports = {
  async getGoogleYesterdayData(req, res) {
    const analyticsData = await analyticsService.getGoogleYesterdayData();

    res.status(httpStatus.OK).send(analyticsData);
  },
  async overviewYesterdayData(req, res) {
    const analyticsData = await analyticsService.overviewYesterdayData();

    res.status(httpStatus.OK).send(analyticsData);
  },
  async analyticData(req, res) {
    const analyticsData = await analyticsService.analyticData();

    res.status(httpStatus.OK).send(analyticsData);
  },
  async vkData(req, res) {
    const analyticsData = await analyticsService.vkData();

    res.status(httpStatus.OK).send(analyticsData);
  },
  async vkPostsAnalyticsData(req, res) {
    const analyticsData = await analyticsService.vkPostsAnalyticsData(req.query);

    res.status(httpStatus.OK).send(analyticsData);
  },
  async vkUsersCollect(req, res) {
    const analyticsData = await analyticsService.vkUsersCollect();

    res.status(httpStatus.OK).send(analyticsData);
  },
  async vkUsersFriends(req, res) {
    const analyticsData = await analyticsService.vkUsersFriends();

    res.status(httpStatus.OK).send(analyticsData);
  },
  async vkUsersFriendsTree(req, res) {
    const analyticsData = await analyticsService.vkUsersFriendsTree(req.query.top);

    res.status(httpStatus.OK).send(analyticsData);
  },
  async vkUsersAnalyticsTypeData(req, res) {
    console.time('js');

    const analyticsData = await analyticsService.vkUsersAnalyticsTypeData(req.params.type);

    console.timeEnd('js');

    res.status(httpStatus.OK).send(analyticsData);
  },
  async vkUsersAnalyticsData(req, res) {
    console.time('js');

    const analyticsData = await analyticsService.vkUsersAnalyticsData();

    console.timeEnd('js');

    res.status(httpStatus.OK).send(analyticsData);
  },
  async vkUsersAnalyticsDataPython(req, res) {
    console.time('py');

    const analyticsData = await analyticsService.vkUsersAnalyticsDataPython();

    console.timeEnd('py');

    res.status(httpStatus.OK).send(analyticsData);
  },
  async vkUsersInterestsAnalyticsData(req, res) {
    const analyticsData = await analyticsService.vkUsersInterestsAnalyticsData();

    res.status(httpStatus.OK).send(analyticsData);
  },
  async googleDataCollect(req, res) {
    const analyticsData = await analyticsService.googleDataCollect();

    res.status(httpStatus.OK).send(analyticsData);
  },
  async googleDataSimple(req, res) {
    const analyticsData = await analyticsService.googleDataSimple(req.query);

    res.status(httpStatus.OK).send(analyticsData);
  },
  async googleData(req, res) {
    const analyticsData = await analyticsService.googleData(req.query);

    res.status(httpStatus.OK).send(analyticsData);
  },
  async googleDataPagesPath(req, res) {
    const analyticsData = await analyticsService.googleDataPagesPath();

    res.status(httpStatus.OK).send(analyticsData);
  },
  async googleDataPages(req, res) {
    const analyticsData = await analyticsService.googleDataPages(req.query);

    res.status(httpStatus.OK).send(analyticsData);
  },
};

