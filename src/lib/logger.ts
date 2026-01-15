/**
 * Logger utility para reemplazar console.log en producción
 * En desarrollo: muestra todos los logs
 * En producción: solo muestra errores y warnings
 */

type LogLevel = 'log' | 'info' | 'warn' | 'error' | 'debug'

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development'

  log(...args: any[]) {
    if (this.isDevelopment) {
      console.log(...args)
    }
  }

  info(...args: any[]) {
    if (this.isDevelopment) {
      console.info(...args)
    }
  }

  warn(...args: any[]) {
    console.warn(...args)
  }

  error(...args: any[]) {
    console.error(...args)
  }

  debug(...args: any[]) {
    if (this.isDevelopment) {
      console.debug(...args)
    }
  }
}

export const logger = new Logger()
