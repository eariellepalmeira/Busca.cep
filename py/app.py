from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import threading
import webbrowser


PROJECT_DIR = Path(__file__).resolve().parent.parent
HOST = "127.0.0.1"
PORT = 8000


def main() -> None:
    handler = partial(SimpleHTTPRequestHandler, directory=str(PROJECT_DIR))
    server = ThreadingHTTPServer((HOST, PORT), handler)
    url = f"http://{HOST}:{PORT}/"

    threading.Timer(0.5, webbrowser.open, args=(url,)).start()
    print(f"Consulta de CEP disponível em {url}")
    print("Pressione Ctrl+C para encerrar.")

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nServidor encerrado.")
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
