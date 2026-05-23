export type Lang = "ka" | "en";

export const translations = {
  ka: {
    // nav / layout
    siteTitle: "ლარის კურსი — NBG ოფიციალური",
    navHome: "მთავარი",
    langLabel: "EN",

    // hero
    heroTitle: "₾ ლარის გაცვლითი კურსი",
    heroSubtitle: "NBG ოფიციალური კურსი",
    refresh: "განახლება",

    // error
    errorMsg: "კურსების ჩატვირთვა ვერ მოხერხდა",
    errorRetry: "სცადე თავიდან",

    // sections
    sectionMovers: "დღის მოძრაობა",
    sectionAll: "ყველა ვალუტა",

    // Calculator
    calcTitle: "კურსის კალკულატორი",
    calcFrom: "საიდან",
    calcTo: "სად",
    calcSwap: "ვალუტების გაცვლა",

    // TopMovers
    gainers: "ლარი გამყარდა (Top 3)",
    losers: "ლარი დასუსტდა (Top 3)",

    // Favorites
    favTitle: "ჩემი ვალუტები ⭐",
    favRemove: "ფავორიტიდან ამოღება",

    // CurrencyTable
    countSuffix: "ვალუტა",
    notFound: "ვალუტა ვერ მოიძებნა",
    tableLabel: "ვალუტის კურსები",
    colCode: "კოდი",
    colName: "ვალუტა",
    colQty: "რაოდ.",
    colRate: "კურსი (₾)",
    colChange: "ცვლილება",
    addFav: "ფავორიტებში დამატება",
    removeFav: "ფავორიტიდან ამოღება",
    copy: "კოპირება",

    // SearchBar
    searchPlaceholder: "ძებნა... (/ სწრაფი წვდომა)",
    searchLabel: "ვალუტის ძებნა",

    // HistoryChart
    loading: "იტვირთება...",
    noData: "მონაცემები არ არის",
    chartRate: "კურსი",
    chartDate: "თარიღი:",
    chartMin: "მინიმალური",
    chartAvg: "საშუალო",
    chartMax: "მაქსიმალური",
    period7: "7 დღე",
    period30: "30 დღე",
    period90: "90 დღე",
    period365: "1 წელი",

    // Footer
    dataSource: "მონაცემები:",
    dataSourceName: "საქართველოს ეროვნული ბანკი",

    // Currency detail
    backHome: "მთავარზე დაბრუნება",
    gelEquivalent: "ქართული ლარი",
    vsYesterday: "გუშინდელთან შედარებით",
    conversion: "კონვერტაცია",
    historicalRate: "ისტორიული კურსი",
  },
  en: {
    // nav / layout
    siteTitle: "GEL Rate — NBG Official",
    navHome: "Home",
    langLabel: "KA",

    // hero
    heroTitle: "₾ Georgian Lari Exchange Rate",
    heroSubtitle: "NBG Official Rate",
    refresh: "Refresh",

    // error
    errorMsg: "Failed to load exchange rates",
    errorRetry: "Try again",

    // sections
    sectionMovers: "Today's Movement",
    sectionAll: "All Currencies",

    // Calculator
    calcTitle: "Currency Calculator",
    calcFrom: "From",
    calcTo: "To",
    calcSwap: "Swap currencies",

    // TopMovers
    gainers: "Lari Strengthened (Top 3)",
    losers: "Lari Weakened (Top 3)",

    // Favorites
    favTitle: "My Currencies ⭐",
    favRemove: "Remove from favorites",

    // CurrencyTable
    countSuffix: "currencies",
    notFound: "No currencies found",
    tableLabel: "Currency exchange rates",
    colCode: "Code",
    colName: "Currency",
    colQty: "Qty",
    colRate: "Rate (₾)",
    colChange: "Change",
    addFav: "Add to favorites",
    removeFav: "Remove from favorites",
    copy: "Copy",

    // SearchBar
    searchPlaceholder: "Search... (/ quick access)",
    searchLabel: "Search currency",

    // HistoryChart
    loading: "Loading...",
    noData: "No data available",
    chartRate: "Rate",
    chartDate: "Date:",
    chartMin: "Minimum",
    chartAvg: "Average",
    chartMax: "Maximum",
    period7: "7 days",
    period30: "30 days",
    period90: "90 days",
    period365: "1 year",

    // Footer
    dataSource: "Data:",
    dataSourceName: "National Bank of Georgia",

    // Currency detail
    backHome: "Back to home",
    gelEquivalent: "Georgian Lari",
    vsYesterday: "compared to yesterday",
    conversion: "Conversion",
    historicalRate: "Historical Rate",
  },
} as const;

export type T = Record<keyof typeof translations.ka, string>;
