# from socketify import App, AppOptions, OpCode, CompressOptions

# def ws_open(ws):
#     print("A WebSocket got connected!")
#     # Let this client listen to topic "broadcast"
#     ws.subscribe("broadcast")

# def ws_message(ws, message, opcode):
#     # Broadcast this message
#     ws.publish("broadcast", message, opcode)

# def ws_close(ws, code, message):
#     print("websocket be closin")

# app = App()
# app.ws(
#     "/*",
#     {
#         "compression": CompressOptions.SHARED_COMPRESSOR,
#         "max_payload_length": 16 * 1024 * 1024,
#         "idle_timeout": 60,
#         "open": ws_open,
#         "message": ws_message,
#         # The library guarantees proper unsubscription at close
#         "close": ws_close,
#         "subscription": lambda ws, topic, subscriptions, subscriptions_before: print(f'subscription/unsubscription on topic {topic} {subscriptions} {subscriptions_before}'),
#     },
# )
# app.any("/", lambda res, req: res.end("Nothing to see here!"))
# app.listen(
#     3000,
#     lambda config: print("Listening on port http://localhost:%d now\n" % (config.port)),
# )
# app.run()

import json
from socketify import App, AppOptions, OpCode, CompressOptions
import sqlite3

# Open a connection to the database
try:
    conn = sqlite3.connect('db/test_database.db')
    print("Connected to database successfully.")
except sqlite3.Error as e:
    print(f"An error occurred while connecting to the database: {e}")

# Create a cursor object
c = conn.cursor()

# Create the users table
try:
    c.execute('''
        CREATE TABLE IF NOT EXISTS users(
            uuid text PRIMARY KEY,
            username text NOT NULL,
            alpha real,
            beta real,
            gamma real
        )
    ''')
    conn.commit()  # Commit the transaction
    print("Users table created successfully.")
except sqlite3.Error as e:
    print(f"An error occurred while creating the users table: {e}")

def ws_open(ws):
    print("A WebSocket got connected!")
    # Let this client listen to topic "broadcast"
    ws.subscribe("broadcast")

def ws_message(ws, message, opcode):
    print(f"Original message (type {type(message)}): {message}")
    # Parse the JSON message into a dictionary
    data = json.loads(message)
    print(f"Parsed message (type {type(data)}): {data}")

    # Insert or update the user record in the SQLite database
    uuid = data['uuid']
    username = data['username']
    alpha = data['alpha']
    beta = data['beta']
    gamma = data['gamma']
    try:
        c.execute('''
            INSERT OR REPLACE INTO users(uuid, username, alpha, beta, gamma) VALUES (?, ?, ?, ?, ?)
        ''', (uuid, username, alpha, beta, gamma))
        conn.commit()  # Commit the transaction
        print("User record inserted or updated.")
    except sqlite3.Error as e:
        print(f"An error occurred while inserting or updating user record: {e}")

    # Broadcast this message
    ws.publish("broadcast", message, opcode)


def ws_close(ws, code, message):
    print("websocket be closin")

app = App()
app.ws(
    "/*",
    {
        "compression": CompressOptions.SHARED_COMPRESSOR,
        "max_payload_length": 16 * 1024 * 1024,
        "idle_timeout": 60,
        "open": ws_open,
        "message": ws_message,
        "close": ws_close,
        "subscription": lambda ws, topic, subscriptions, subscriptions_before: print(f'subscription/unsubscription on topic {topic} {subscriptions} {subscriptions_before}'),
    },
)
app.any("/", lambda res, req: res.end("Nothing to see here!"))
app.listen(
    3000,
    lambda config: print("Listening on port http://localhost:%d now\n" % (config.port)),
)
app.run()



