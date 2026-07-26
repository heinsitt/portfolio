# Nginx web server သုံးမယ် 
FROM nginx:alpine

# အကုန် copy လုပ်ပြီး Nginx folder ထဲထည့်မယ်
COPY . /usr/share/nginx/html

# Port 80 မှာ run မယ်
EXPOSE 80

# Nginx စမယ်
CMD ["nginx", "-g", "daemon off;"]