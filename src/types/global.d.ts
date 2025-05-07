// src/types/global.d.ts

export {}

declare global {
  interface Window {
    google?: {
      accounts?: {
        oauth2?: {
          initCodeClient: (config: {
            client_id: string
            scope: string
            ux_mode: string
            callback: (response: { code: string }) => void
          }) => {
            requestCode: () => void
          }
        }
      }
    }
  }
}
