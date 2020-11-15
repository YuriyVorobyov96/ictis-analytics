export interface User {
  email: string,
  password: string,
}

export interface Message {
  message: string,
}

export interface Position {
  name: string,
  cost: number,
  categoryId: string,
  userId?: string,
  _id?: string,
  quantity?: number,
}

export interface Order {
  date?: Date,
  order?: number,
  userId?: string,
  list: OrderPosition[],
  _id?: string,
}

export interface OrderPosition {
  name: string,
  cost: number,
  quantity: number,
  _id?: string,
}

export interface Filter {
  start?: Date,
  end?: Date,
  order?: number,
  top?: number,
  type?: string,
  label?: string,
  query?: string,
  sort?: number,
  id?: number,
  title?: string,
  path?: string,
}

export interface Category {
  name: string,
  imageSrc?: string,
  userId?: string,
  _id?: string,
}

// export interface OverviewPage {
//   orders: OverviewPageItem,
//   gain: OverviewPageItem,
// }

// export interface OverviewPageItem {
//   percent: number,
//   compare: number,
//   yesterday: number,
//   isHigher: boolean,
// }

export interface OverviewPage {
  usersCount: OverviewPageItem,
  newUsersCount: OverviewPageItem,
  sessionsCount: OverviewPageItem,
  pageViewsCount: OverviewPageItem,
}

export interface OverviewPageItem {
  percent: number,
  compare: number,
  yesterday: number,
  isHigher: boolean,
}

export interface AnalyticsPage {
  average: number,
  chart: AnalyticsChartItem[],
}

// export interface AnalyticsChartItem {
//   gain: number,
//   order: number,
//   label: string,
// }

export interface AnalyticsChartItem {
  usersCount: number,
  newUsersCount: number,
  sessionsCount: number,
  pageViewsCount: number,
  label: string,
}

export interface AnalyticsPageVk {
  sexChart?: AnalyticsChartItemVk[],
  universitiesChart?: AnalyticsChartItemVk[],
  cityChart?: AnalyticsChartItemVk[],
  countryChart?: AnalyticsChartItemVk[],
  facultyChart?: AnalyticsChartItemVk[],
  chairChart?: AnalyticsChartItemVk[],
  graduationChart?: AnalyticsChartItemVk[],
  educationFormChart?: AnalyticsChartItemVk[],
  educationStatusChart?: AnalyticsChartItemVk[],
}

// export interface AnalyticsPageVkPosts {
//   chart: AnalyticsPagePostsItem[],
// }

export interface AnalyticsPageVkPosts {
  id: number,
  date: string,
  text: string,
  likesCount: number,
  repostsCount: number,
  commentsCount: number,
  viewsCount: number,
  url: string,
}

export interface AnalyticsChartItemVk {
  percent: number,
  number: number,
  label: string,
}

export interface AnalyticsInterestsVk {
  total?: number,
  pairs?: number,
  words?: AnalyticsInterestsVkItem[],
}

export interface AnalyticsInterestsVkItem {
  key?: string,
  number?: number,
  percent?: number,
}

export interface AnalyticsWebsiteData {
  sum?: number,
  dates?: string[],
  chart: AnalyticsWebsiteDataItem[],
}

export interface AnalyticsWebsiteDataItem {
  label?: string,
  usersCount?: number,
  newUsersCount?: number,
  sessionsCount?: number,
  pageViewsCount?: number,
  countries?: AnalyticsWebsiteDataItemItem[],
  cities?: AnalyticsWebsiteDataItemItem[],
  regions?: AnalyticsWebsiteDataItemItem[],
}

export interface AnalyticsWebsiteDataItemItem {
  _id?: string,
  name?: string,
  number?: number,
}

export interface AnalyticsPathTreeData {
  nodes?: any[],
  edges?: any[],
}

export interface AnalyticsUsersTreeData {
  nodes?: any[],
  edges?: any[],
}

export interface AnalyticsPagesData {
  title?: string,
  path?: string,
  number?: number,
}