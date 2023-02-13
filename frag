import socket

def server():
    server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server_socket.bind((socket.gethostname(),9994))
    server_socket.listen()
    client()
    client_socket,address = server_socket.accept()
    inp = client_socket.recv(1024).decode('ascii')
    client_socket.close()
    mtu = int(input("\nEnter the maximum transfer unit(minimum 20): "))
    mtu-=20
    id = 100
    fragments = []
    offset = 0
    print("\nThe Fragmentation of the data is: ")
    while offset < len(inp):
        f = inp[offset:offset+mtu]
        fragments.append(f)
        print("Data: {}, ID: {}, FRAGMENTATION OFFSET: {}".format(f,id,offset))
        offset+=mtu

        

def client():
    client_socket = socket.socket(socket.AF_INET,socket.SOCK_STREAM)
    client_socket.connect(('192.168.0.5',9994))

    with open('sample_file.txt','rb') as f:
        datafragment = f.read()
    client_socket.send(datafragment)
    client_socket.close()


if __name__ == '__main__':
    server()
