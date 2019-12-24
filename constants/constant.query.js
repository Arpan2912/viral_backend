// put all queries here
module.exports = {
  // qGetUserDetail: `select * from "users" where email=:email`,
  getRoughIdFromUuid: `select id from roughs where u_uuid=:uuid`,
  getLotIdFromUuid: `select id from lot_data where u_uuid=:uuid`,
  getRoughHistoryIdFromUuid: `select id from lot_history where u_uuid=:uuid`,
  getPlanResultIdFromUuid: `select id from plan_result where u_uuid=:uuid`,
  getPersonIdFromUuid: `select id from persons where u_uuid=:uuid`,
  getPersons: `select u_uuid as uuid,first_name,last_name,address,designation,company,phone,email from persons`,
  getRoughList: `select u_uuid as rough_id,rough_name,weight,price,unit,purchase_date from roughs`,
  getLotList: `select l.u_uuid as lot_id,r.u_uuid as rough_id,l.lot_name,l.weight,l.unit,r.rough_name from lot_data as l
  inner join roughs as r on r.id=l.rough_id where l.rough_id=:rough_id`,
  qGetLotCurrentStatus: `
  with last_status as (
    select max(id),lot_id from lot_history group by lot_id
  ),
  all_data as (
    select r.u_uuid as rough_id,l.u_uuid as lot_id,l.lot_name,r.rough_name,r.weight,r.unit,l.weight as lot_weight,l.unit as lot_unit,
    r.price,status,start_date,end_date,
    p.first_name,p.last_name,p.u_uuid as person_id
    from 
    lot_history as h 
    inner join last_status as ls on ls.max=h.id 
    inner join persons as  p on p.id = h.person_id
    right join lot_data as l on h.lot_id=l.id
    inner join roughs as r on r.id=l.rough_id   
  )
  select * from all_data`,
  getLatestLotStatus: `select status,end_date from lot_history where lot_id=:lot_id order by id desc;`,
  qGetRoughCurrentStatusByRoughId: `
    with last_status as (
      select max(id),lot_id from lot_history where lot_id=:lot_id
      group by lot_id
    ),
    all_data as (
      select h.id,h.u_uuid as history_id,l.lot_name,r.rough_name,r.price,status,start_date,end_date,
      l.u_uuid as lot_id,r.u_uuid as rough_id
      from 
      lot_history as h 
      inner join last_status as ls on ls.max=h.id 
      inner join persons as  p on p.id = h.person_id
      right join lot_data as l on h.lot_id=l.id
      inner join roughs as r on r.id=l.rough_id   
      where l.id=:lot_id
    )
    select * from all_data`,
  getLotHistory: `select l.lot_name,r.rough_name,h.id,l.u_uuid as lot_id,r.u_uuid as rough_id,
    h.u_uuid as history_id,first_name,last_name,status,start_date,end_date 
    from lot_history as h 
    inner join persons p on h.person_id=p.id
    inner join lot_data l on l.id=h.lot_id
    inner join roughs as r on r.id=l.rough_id
    where lot_id=:lot_id order by h.id desc`,

  getRoughDetail: `select r.id,r.u_uuid as rough_id,rough_name,weight,unit,status from roughs as r left join lot_history as h  on r.id=h.rough_id
  where r.rough_id=:rough_id
  `,

  getPlanDetailOfRough: `
  with latest_plan as (
    select max(history_id) from plan_result where lot_id=:lot_id group by lot_id
  )
  select p.u_uuid as plan_id,p.stone_name,p.weight,p.unit,p.history_id,h.u_uuid as history_uuid from plan_result as p
  inner join lot_history as h on h.id=p.history_id 
  where history_id in (select max from latest_plan)`,

  getLsDetailOfRough: `
  with latest_plan as (
    select max(history_id) from ls_result where lot_id=:lot_id group by lot_id
  )
  select l.u_uuid,l.stone_name,l.weight,l.unit,l.history_id,h.u_uuid as history_uuid from ls_result as l 
  inner join lot_history as h on h.id=l.history_id 
  where l.history_id in (select max from latest_plan)`,

  getBlockDetailOfRough: `
  with latest_plan as (
    select max(history_id) from block_result where lot_id=:lot_id group by lot_id
  )
  select b.u_uuid,b.stone_name,b.weight,b.unit,b.history_id,h.u_uuid as history_uuid from block_result as b
  inner join lot_history as h on h.id=b.history_id 
  where b.history_id in (select max from latest_plan)`,

  getPlanDetailOfRoughBasedOnHistoryId: `
  select u_uuid,stone_name,weight,unit,history_id from plan_result 
  where  lot_id=:lot_id and history_id=:history_id`,

  getLsDetailOfRoughBasedOnHistoryId: `
  select u_uuid,stone_name,weight,unit,history_id from ls_result 
  where lot_id=:lot_id and history_id=:history_id`,

  getBlockDetailOfRoughBasedOnHistoryId: `
  select u_uuid,stone_name,weight,unit,history_id from block_result
  where lot_id=:lot_id and history_id=:history_id`,

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

  insertLotHistory: `insert into lot_history (u_uuid,lot_id,status,person_id,start_date,end_date,
    is_active,is_deleted,created_by,updated_by,created_at,updated_at) 
    values (
      :uuid,:lot_id,:status,:person_id,:start_date,:end_date,
      :is_active,:is_deleted,:created_by,:updated_by,:created_at,:updated_at
    )`,

  updateLotHistory: `update  lot_history set end_date=:end_date,updated_at=:updated_at,labour_rate=:labour_rate,
  total_labour=:total_labour,labour_history_id=:labour_history_id
  where id=:history_id`,
  insertPlanResult: `insert into plan_result  (u_uuid, stone_name,lot_id,person_id,weight,unit,history_id,
    is_active,is_deleted,created_by,updated_by,created_at,updated_at) 
    values (
      :uuid,:stone_name,:lot_id,:person_id,:weight,:unit,:history_id,
      :is_active,:is_deleted,:created_by,:updated_by,:created_at,:updated_at
    )`,
  insertLsResult: `insert into ls_result (u_uuid,lot_id,history_id,person_id,stone_name,weight,unit,
    is_active,is_deleted,created_by,updated_by,created_at,updated_at) 
    values(
      :uuid,:lot_id,:history_id,:person_id,:stone_name,:weight,:unit,
      :is_active,:is_deleted,:created_by,:updated_by,:created_at,:updated_at
    )`,
  insertBlockResult: `insert into block_result (u_uuid,lot_id,history_id,person_id,stone_name,weight,unit,
      is_active,is_deleted,created_by,updated_by,created_at,updated_at) 
      values(
        :uuid,:lot_id,:history_id,:person_id,:stone_name,:weight,:unit,
        :is_active,:is_deleted,:created_by,:updated_by,:created_at,:updated_at
      )`
  // insertRoughHistory: `insert into lot_history(uuid)`
};
