const make = require("./make");

module.exports = async (browser, logger, config) => {
  await Promise.all([
    (async () => {
      while (1) {
        try {
          await make(browser, logger, config);
        } catch (e) {
          logger.error(
            "Ошибка при управление рекламой",
            e && e.response && e.response.data
          );
        }
        // каждые 30 сек
        await new Promise(res => setTimeout(res, 30 * 1000));
      }
    })()
  ]);
};
