# Express Typescript และ MySQL2
ทดสอบการเชื่อมต่อฐานข้อมูล MySQL โดยใช้ mysql2 library

### ขั้นตอนการติดตั้ง
เปิด Terminal แล้วทำตามขั้นตอนดังนี้

1. clone โปรเจคจาก Github
```
https://github.com/WarinCode/express-ts-and-mysql2.git
```

2. เข้าไปยัง directory ของ project
```
cd express-ts-and-mysql2
```

3. ดาวโหลด์ package library ต่างๆลงโปรเจค
```
npm install
```

4. สร้างฐานข้อมูลและสร้างตารางกำหนดค่า attribute แต่ละ field
![img2](imgs/img2.png)

5. นำไฟล์ post.json import เข้าไปใน table ที่เราสร้าง 
![img3](imgs/img3.png)
![img4](imgs/img4.png)

6. สร้างไฟล์ .env ขึ้นมาใน root directory แล้วกำหนดค่าตัวแปรสภาพแวดล้อมต่างๆโดยในดูตัวอย่างได้ในไฟล์ .env.example
![img1](imgs/img1.png)

7. run server หลังบ้าน
```
npm run dev
```

8. ทดสอบเส้น API
![img5](imgs/img5.png)
![img6](imgs/img6.png)

9. build ตัวโปรเจคจาก Typescript -> Javascript ต้องติดตั้ง Typscript ลงเครื่องก่อน `npm install -g typescript`
```
tsc
```