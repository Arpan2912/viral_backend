// put all queries here
module.exports = {
  // qGetUserDetail: `select * from "users" where email=:email`,
  getRoughIdFromUuid: `select id from roughs where u_uuid=:uuid`,
  getLotIdFromUuid: `select id from lot_data where u_uuid=:uuid`,
  getRoughHistoryIdFromUuid: `select id from rough_history where u_uuid=:uuid`,
  getPlanResultIdFromUuid: `select id from plan_result where u_uuid=:uuid`,
  getPersonIdFromUuid: `select id from persons where u_uuid=:uuid`,
  getPersons: `select u_uuid as uuid,first_name,last_name,address,designation,company,phone,email from persons`,
  getRoughList: `select u_uuid as rough_id,rough_name,weight,price,unit,purchase_date from roughs`,
  getLotList: `select l.u_uuid as lot_id,r.u_uuid as rough_id,l.lot_name,l.weight,l.unit,r.rough_name from lot_data as l
  inner join roughs as r on r.id=l.rough_id where l.rough_id=:rough_id`,
  qGetRoughCurrentStatus: `
  with last_status as (
    select max(id),rough_id from rough_history group by rough_id
  ),
  all_data as (
    select r.u_uuid as rough_id,lot_name,rough_name,weight,unit,price,status,start_date,end_date,
    p.first_name,p.last_name,p.u_uuid as person_id

    from 
    rough_history as h 
    inner join last_status as l on l.max=h.id 
    inner join persons as  p on p.id = h.person_id
    right join roughs as r on r.id=h.rough_id   
  )
  select * from all_data`,
  qGetRoughCurrentStatusByRoughId: `
    with last_status as (
      select max(id),rough_id from rough_history where rough_id=:rough_id
      group by rough_id
    ),
    all_data as (
      select h.u_uuid as rough_id,h.id ,lot_name,rough_name,price,status,start_date,end_date 
      from 
      rough_history as h 
      inner join last_status as l on l.max=h.id 
      inner join persons as  p on p.id = h.person_id
      right join roughs as r on r.id=h.rough_id
      where r.id=:rough_id
    )
    select * from all_data`,
  getRoughHistory: `select r.lot_name,r.rough_name,h.id,h.u_uuid,first_name,last_name,status,start_date,end_date 
    from rough_history as h 
    inner join persons p on h.person_id=p.id
    inner join roughs as r on r.id=h.rough_id
    where rough_id=:rough_id order by h.id desc`,

  getRoughDetail: `select r.id,r.u_uuid as rough_id,rough_name,weight,unit,status from roughs as r left join rough_history as h  on r.id=h.rough_id
  where r.rough_id=:rough_id
  `,

  getPlanDetailOfRough: `
  with latest_plan as (
    select max(history_id) from plan_result where rough_id=:rough_id group by rough_id
  )
  select u_uuid as plan_id,plan_name,weight,unit,history_id from plan_result as p 
  where history_id in (select max from latest_plan)`,

  getLsDetailOfRough: `
  with latest_plan as (
    select max(history_id) from ls_result where rough_id=:rough_id group by rough_id
  )
  select p.u_uuid,p.plan_name,p.weight,p.unit,l.history_id from ls_result as l 
  inner join plan_result as p on p.id=l.plan_id
  where l.history_id in (select max from latest_plan)`,

  getBlockDetailOfRough: `
  with latest_plan as (
    select max(history_id) from block_result where rough_id=:rough_id group by rough_id
  )
  select p.u_uuid,p.plan_name,p.weight,p.unit,b.history_id from block_result as b
  inner join plan_result as p on p.id=b.plan_id
  where b.history_id in (select max from latest_plan)`,

  getPlanDetailOfRoughBasedOnHistoryId: `
  select u_uuid,plan_name,weight,unit,history_id from plan_result 
  where  rough_id=:rough_id and history_id=:history_id`,

  getLsDetailOfRoughBasedOnHistoryId: `
  select p.u_uuid,p.plan_name,p.weight,p.unit,l.history_id from ls_result as l 
  inner join plan_result as p on p.id=l.plan_id
  where l.rough_id=:rough_id and l.history_id=:history_id`,

  getBlockDetailOfRoughBasedOnHistoryId: `
  select p.u_uuid,p.plan_name,p.weight,p.unit,b.history_id from block_result as b
  inner join plan_result as p on p.id=b.plan_id
  where b.rough_id=:rough_id and b.history_id=:history_id`,

  insertRough: `insert into roughs (u_uuid,rough_name,price,weight,unit,purchase_date,
    is_active,is_deleted,created_by,updated_by,created_at,updated_at) 
    values (
      :uuid,:rough_name,:price,:weight,:unit,:purchase_date,
      :is_active,:is_deleted,:created_by,:updated_by,:created_at,:updated_at 
    ) returning id;
    `,

  insertLotData: `insert into lot_data (u_uuid,lot_name,weight,unit,rough_id,
      is_active,is_deleted,created_by,updated_by,created_at,updated_at) 
      values (
        :uuid,:lot_name,:weight,:unit,:rough_id,
        :is_active,:is_deleted,:created_by,:updated_by,:created_at,:updated_at 
      )
      `,

  updateRough: replacement => {
    let q = `update roughs set updated_at=:updated_at`;

    if (replacement.rough_name) {
      q += `,rough_name=:rough_name`;
    }
    if (replacement.weight) {
      q += `,weight=:weight`;
    }
    if (replacement.unit) {
      q += `,unit=:unit`;
    }
    if (replacement.price) {
      q += `,price=:price`;
    }
    if (replacement.purchase_date) {
      q += `,purchase_date=:purchase_date`;
    }

    q += ` where id=:rough_id`;
    return q;
  },

  updateLotData: replacement => {
    let q = `update lot_data set updated_at=:updated_at`;
    if (replacement.rough_id) {
      q += `,rough_id=:rough_id`;
    }
    if (replacement.lot_name) {
      q += `,lot_name=:lot_name`;
    }
    if (replacement.weight) {
      q += `,weight=:weight`;
    }
    if (replacement.unit) {
      q += `,unit=:unit`;
    }
    q += ` where id=:lot_id`;
    return q;
  },

  insertPerson: `insert into persons (u_uuid,first_name,last_name,email,phone,address,designation,
    company,is_active,is_deleted,created_at,updated_at) 
    values (
      :uuid,:first_name,:last_name,:email,:phone,:address,:designation,
      :company,:is_active,:is_deleted,:created_at,:updated_at
    )`,

  updatePerson: replacement => {
    let q = `update persons set updated_at=:updated_at`;
    if (replacement.first_name) {
      q += `,first_name=:first_name`;
    }
    if (replacement.last_name) {
      q += `,last_name=:last_name`;
    }
    if (replacement.phone) {
      q += `,phone=:phone`;
    }
    if (replacement.email) {
      q += `,email=:email`;
    }
    if (replacement.designation) {
      q += `,designation=:designation`;
    }
    if (replacement.address) {
      q += `,address=:address`;
    }
    if (replacement.company) {
      q += `,company=:company`;
    }

    q += ` where id=:person_id`;
    return q;
  },

  insertRoughHistory: `insert into rough_history (u_uuid,rough_id,status,person_id,start_date,end_date,
    is_active,is_deleted,created_by,updated_by,created_at,updated_at) 
    values (
      :uuid,:rough_id,:status,:person_id,:start_date,:end_date,
      :is_active,:is_deleted,:created_by,:updated_by,:created_at,:updated_at
    )`,

  updateRoughHistory: `update  rough_history set end_date=:end_date,updated_at=:updated_at where id=:history_id`,
  insertPlanResult: `insert into plan_result  (u_uuid, plan_name,rough_id,person_id,weight,unit,history_id,
    is_active,is_deleted,created_by,updated_by,created_at,updated_at) 
    values (
      :uuid,:plan_name,:rough_id,:person_id,:weight,:unit,:history_id,
      :is_active,:is_deleted,:created_by,:updated_by,:created_at,:updated_at
    )`,
  insertLsResult: `insert into ls_result (u_uuid,plan_id,rough_id,history_id,person_id,
    is_active,is_deleted,created_by,updated_by,created_at,updated_at) 
    values(
      :uuid,:plan_id,:rough_id,:history_id,:person_id,
      :is_active,:is_deleted,:created_by,:updated_by,:created_at,:updated_at
    )`,
  insertBlockResult: `insert into block_result (u_uuid,plan_id,rough_id,history_id,person_id,
      is_active,is_deleted,created_by,updated_by,created_at,updated_at) 
      values(
        :uuid,:plan_id,:rough_id,:history_id,:person_id,
        :is_active,:is_deleted,:created_by,:updated_by,:created_at,:updated_at
      )`
  // insertRoughHistory: `insert into rough_history(uuid)`
};
