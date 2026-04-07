const rushEngine = require("./rush/rushEngine");
const rushLogs = require("./rush/logs");

/**
 * 抢购监控日志：命名空间 /rush-monitor，事件 snapshot / log（与原先 SSE 载荷一致）
 */
function attachRushMonitor(io) {
  const ns = io.of("/rush-monitor");
  ns.on("connection", (socket) => {
    try {
      socket.emit("snapshot", { entries: rushEngine.getMonitorLogs() });
    } catch {
      socket.emit("snapshot", { entries: [] });
    }

    const onEntry = (entry) => {
      try {
        socket.emit("log", { entry });
      } catch {
        /* ignore */
      }
    };
    const unsub = rushLogs.subscribeMonitor(onEntry);

    socket.on("disconnect", () => {
      unsub();
    });
  });
}

module.exports = { attachRushMonitor };
