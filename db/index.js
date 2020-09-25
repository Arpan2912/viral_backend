/* eslint-disable max-len */
/* eslint-disable no-console */
const Sequelize = require("sequelize");

const db = {};

// local
console.log(process.env.DB_NAME, process.env.DB_USERNAME);
// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USERNAME,
//   process.env.DB_PASSWORD,
//   {
//     host: process.env.DB_HOST,
//     dialect: process.env.DB_DIALECT
//   }
// );

const sequelize = new Sequelize("diamond_tracker", "ACER", "123", {
  host: "localhost",
  dialect: "postgres"
});

sequelize
  .authenticate()
  .then(con => {
    console.log("Connection has been established successfully.", con);
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

db.sequelize = sequelize;
db.Sequelize = sequelize;

module.exports = db;

/*
npx sequelize-cli model:generate --name user --attributes first_name:string,last_name:string,email:string,phone:string,password:string,salt:string,city:string,state:string,country:string,address:string,user_type:string,google_id:string,is_active:boolean,is_deleted:boolean,created_at:date,updated_at:date,last_login:date

npx sequelize-cli model:generate --name event --attributes u_uuid:uuid,title:string,user_id:integer,event_date:date,event_start_time:date,event_end_time:date,container:integer,location:json,timezone:string,date_format:string,time_format:string,homepage:string,description:string,upcoming:boolean,featured:boolean,is_secure:boolean,is_active:boolean,is_deleted:boolean,created_at:date,updated_at:date

npx sequelize-cli model:generate --name container --attributes u_uuid:uuid,name:string,user_id:integer,is_active:boolean,is_deleted:boolean,created_at:date,updated_at:date

npx sequelize-cli model:generate --name feature --attributes u_uuid:uuid,name:string,description:string,is_active:boolean,is_deleted:boolean,created_at:date,updated_at:date

npx sequelize-cli model:generate --name event_menu --attributes u_uuid:uuid,alias:string,event_id:integer,feature_id:integer,is_active:boolean,is_deleted:boolean,created_at:date,updated_at:date

npx sequelize-cli model:generate --name agenda --attributes u_uuid:uuid,event_id:integer,user_id:integer,start_date_time:date,duration:string,venue:string,description:string,is_active:boolean,is_deleted:boolean,created_at:date,updated_at:date

npx sequelize-cli model:generate --name agenda_speaker --attributes u_uuid:uuid,agenda_id:integer,speaker_id:integer,user_id:integer,is_active:boolean,is_deleted:boolean,created_at:date,updated_at:date

npx sequelize-cli model:generate --name attendee --attributes u_uuid:uuid,user_id:integer,event_id:integer,menu_id:integer,first_name:string,last_name:string,company:string,email:string,phone:string,website:string,description:string,is_active:boolean,is_deleted:boolean,created_at:date,updated_at:date

npx sequelize-cli model:generate --name contact_us --attributes u_uuid:uuid,user_id:integer,event_id:integer,menu_id:integer,first_name:string,last_name:string,position:string,email:string,phone:string,is_active:boolean,is_deleted:boolean,created_at:date,updated_at:date

npx sequelize-cli model:generate --name info_booth --attributes u_uuid:uuid,user_id:integer,event_id:integer,menu_id:integer,title:string,content:string,is_active:boolean,is_deleted:boolean,created_at:date,updated_at:date

npx sequelize-cli model:generate --name speaker --attributes u_uuid:uuid,user_id:integer,event_id:integer,menu_id:integer,first_name:string,last_name:string,email:string,is_active:boolean,is_deleted:boolean,created_at:date,updated_at:date

npx sequelize-cli model:generate --name sponsor --attributes u_uuid:uuid,user_id:integer,event_id:integer,menu_id:integer,first_name:string,last_name:string,email:string,website:string,phone:string,description:string,facebook:string,linkedin:string,twitter:string,google:string,is_active:boolean,is_deleted:boolean,created_at:date,updated_at:date

npx sequelize-cli model:generate --name feedback --attributes u_uuid:uuid,user_id:integer,event_id:integer,menu_id:integer,question_type:string,question:string,options:string,is_active:boolean,is_deleted:boolean,created_at:date,updated_at:date

npx sequelize-cli model:generate --name exhibitor --attributes u_uuid:uuid,user_id:integer,event_id:integer,menu_id:integer,first_name:string,last_name:string,stand_no:string,email:string,website:string,phone:string,description:string,facebook:string,linkedin:string,twitter:string,google:string,is_active:boolean,is_deleted:boolean,created_at:date,updated_at:date

npx sequelize-cli model:generate --name web_page --attributes u_uuid:uuid,user_id:integer,event_id:integer,menu_id:integer,url:string,is_active:boolean,is_deleted:boolean,created_at:date,updated_at:date

npx sequelize-cli model:generate --name user_token --attributes u_uuid:uuid,user_id:integer,token:string,type:string,is_active:boolean,is_deleted:boolean,created_at:date,updated_at:date

npx sequelize-cli model:generate --name documents --attributes u_uuid:uuid,user_id:integer,feature:string,feature_id:integer,url:string,is_active:boolean,is_deleted:boolean,created_at:date,updated_at:date

npx sequelize-cli model:generate --name device_tokens --attributes u_uuid:uuid,user_id:integer,device_token:string,device_type:string,os:string,is_active:boolean,is_deleted:boolean,created_at:date,updated_at:date

npx sequelize-cli model:generate --name user_roles --attributes u_uuid:uuid,child_user_id:integer,parent_user_id:integer,role:string,is_active:boolean,is_deleted:boolean,created_at:date,updated_at:date

npx sequelize-cli model:generate --name accounts --attributes u_uuid:uuid,account_name:string,is_active:boolean,is_deleted:boolean,created_at:date,updated_at:date


*/

// npx sequelize-cli migration:generate --name rough --attributes lot_name:string,rough_no:string,price:string,weight:string,unit:string,salt:string,is_active:boolean,is_deleted:boolean,created_at:date,updated_at:date
