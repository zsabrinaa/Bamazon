create database bamazon_db;
use bamazon_db;
create table products(
id int NOT NULL AUTO_INCREMENT
,product_name varchar(100) not null
,department_name varchar(50)
,price decimal (10,2) not null
,stock_quantity int not null
,primary key (id)
);
insert into products(product_name,department_name,price,stock_quantity)
values ('Life Savers',"Food",7.97,1500)
,('Yoga mat',"Sports",42.95,150)
,('LG 43" 4K HDR Smart LED UHD TV',"Electronics",349.00,100)
,('Apple iPad (Latest Model) 32GB Wi-Fi - Space Gray',"Electronics",299.98,250)
,('Coleman SaluSpa Inflatable Hot Tub',"Toys",339.00,50)
,('LEGO Ideas Pop-Up Book',"Toys",55.99,90)
,("Rubik's Race Game","Toys",16.97,40)
,('Protein Chewy Bars',"Food",8.24,500)
,('Shampoo',"Beauty",7.01,150)
,('Running shoes',"Sport",41.90,300);
update products
set stock_quantity = 50
where id = 7;
select * from products;

