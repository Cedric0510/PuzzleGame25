import { io, Socket } from 'socket.io-client';

class ApiManager {
    private socket: Socket | null = null;
    private serverUrl: string;

    constructor(serverUrl: string = 'wss://localhost:3000') {
        this.serverUrl = serverUrl;
    }

    connect(): void {
        if (this.socket?.connected) {
            return;
        }

        this.socket = io(this.serverUrl, {
            transports: ['websocket'],
            upgrade: false
        });

        this.socket.on('connect', () => {
            console.log('Connected to server');
        });

        this.socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });

        this.socket.on('error', (error: any) => {
            console.error('Socket error:', error);
        });
    }

    disconnect(): void {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }
    }

    emit(event: string, data?: any): void {
        if (this.socket?.connected) {
            this.socket.emit(event, data);
        }
    }

    on(event: string, callback: (...args: any[]) => void): void {
        if (this.socket) {
            this.socket.on(event, callback);
        }
    }

    off(event: string, callback?: (...args: any[]) => void): void {
        if (this.socket) {
            this.socket.off(event, callback);
        }
    }

    isConnected(): boolean {
        return this.socket?.connected ?? false;
    }
}

export default ApiManager;