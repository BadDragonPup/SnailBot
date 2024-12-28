type LogLevel = 'debug' | 'info' | 'warn' | 'error';

class Logger {
    private static instance: Logger;
    private logLevel: LogLevel;

    private constructor(logLevel: LogLevel = 'info') {
        this.logLevel = logLevel;
    }

    public static getInstance(logLevel?: LogLevel): Logger {
        if (!Logger.instance) {
            Logger.instance = new Logger(logLevel);
        }
        return Logger.instance;
    }

    private shouldLog(level: LogLevel): boolean {
        const levels: LogLevel[] = ['debug', 'info', 'warn', 'error'];
        return levels.indexOf(level) >= levels.indexOf(this.logLevel);
    }

    debug(message: string) {
        if (this.shouldLog('debug')) {
            console.debug(`[DEBUG] ${new Date().toISOString()}: ${message}`);
        }
    }

    info(message: string) {
        if (this.shouldLog('info')) {
            console.log(`[INFO] ${new Date().toISOString()}: ${message}`);
        }
    }

    warn(message: string) {
        if (this.shouldLog('warn')) {
            console.warn(`[WARN] ${new Date().toISOString()}: ${message}`);
        }
    }

    error(message: string, error?: Error) {
        if (this.shouldLog('error')) {
            console.error(`[ERROR] ${new Date().toISOString()}: ${message}`);
            if (error) {
                console.error(error.stack);
            }
        }
    }
}

export default Logger;