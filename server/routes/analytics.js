const express = require('express');
const router = new express.Router();
const analyticsController = require('../controllers/analytics');
const { wrapController } = require('../helpers/catchError');
const ctrl = wrapController(analyticsController);
const jwtCheck = require('../middleware/jwtcheck');

router.get('/data', jwtCheck.ensureToken, ctrl.getGoogleYesterdayData);
router.get('/overview/data', jwtCheck.ensureToken, ctrl.overviewYesterdayData);
router.get('/graph/data', jwtCheck.ensureToken, ctrl.analyticData);
router.get('/vk/data', jwtCheck.ensureToken, ctrl.vkData);
router.get('/vk/data/posts', jwtCheck.ensureToken, ctrl.vkPostsAnalyticsData);
router.get('/vk/data/users', jwtCheck.ensureToken, ctrl.vkUsersCollect);
router.get('/vk/data/users/friends', jwtCheck.ensureToken, ctrl.vkUsersFriends);
router.get('/vk/data/users/friends/tree', jwtCheck.ensureToken, ctrl.vkUsersFriendsTree);
router.get('/vk/data/users/analytics/', jwtCheck.ensureToken, ctrl.vkUsersAnalyticsData);
router.get('/vk/data/users/analytics/:type', jwtCheck.ensureToken, ctrl.vkUsersAnalyticsTypeData);
router.get('/vk/data/users/analytics-py', jwtCheck.ensureToken, ctrl.vkUsersAnalyticsDataPython);
router.get('/vk/data/users/interests', jwtCheck.ensureToken, ctrl.vkUsersInterestsAnalyticsData);
router.get('/google/data', jwtCheck.ensureToken, ctrl.googleData);
router.get('/google/data/simple', jwtCheck.ensureToken, ctrl.googleDataSimple);
router.get('/google/data/collect', jwtCheck.ensureToken, ctrl.googleDataCollect);
router.get('/google/data/pages-path', jwtCheck.ensureToken, ctrl.googleDataPagesPath);
router.get('/google/data/pages', jwtCheck.ensureToken, ctrl.googleDataPages);

module.exports = router;
