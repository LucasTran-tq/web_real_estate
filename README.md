1. Frontend: ReactJS
2. Backend: Nodejs
3. Database: MongoDb

# Vui lòng đọc trước khi test
# Cho việc test trên môi trường development (localhost)
1. Sửa biến REACT_APP_API_URL từ port 3000 thành 5000 trong .env front end
2. Sửa biến APP_PORT từ port 3000 thành 5000 trong .env back end
3. Sửa biến SERVER_URL từ port 3000 thành 5000 trong .env back end 

Lý do: Do nếu để đúng như mặc định template thì port của localhost back end và front end sẽ đều là 3000, cái nào chạy sau sẽ bị đổi port nên rất khó kiểm soát. Nên trong quá trình lập trình phát triển, nhóm 3 đã đổi port server thành 5000 và cũng như cài đặt id app của gg fb hoạt động trên miền localhost 3000 của bên client react. Nhưng khi push lên gitlab để tránh conflict với các nhóm khác đã sửa lại port của server về lại 3000 như đúng template gốc. Do đó để test thì cần đổi theo hướng dẫn để tránh việc các api cũng như các id app gg fb không hoạt động trên miền port đã thay đổi khi back end và front end đều bị trùng.

