// put all queries here
module.exports = {
  // qGetUserDetail: `select * from "users" where email=:email`,
  createUser: `insert into  users (u_uuid,first_name,last_name,email,
    phone,password,user_type,created_at,updated_at)
  values (:uuid,:first_name,:last_name,:email,
    :phone,:password,:user_type,:created_at,:updated_at)`,
  getUserDetail: `select * from users where phone=:phone`,
  getStoneIdFromUuid: `select id from stones where u_uuid=:uuid`,
  getRoughIdFromUuid: `select id from roughs where u_uuid=:uuid`,
  getLotIdFromUuid: `select id,rough_id from lot_data where u_uuid=:uuid`,
  getLotDataFromUuid: `select lot_name,rough_name from lot_data as l inner join roughs as r on l.rough_id=r.id where l.u_uuid=:uuid`,
  getRoughHistoryIdFromUuid: `select id from lot_history where u_uuid=:uuid`,
  getPlanResultIdFromUuid: `select id from plan_result where u_uuid=:uuid`,
  getHphtResultIdFromUuid: `select id from hpht_result where u_uuid=:uuid`,
  getPersonIdFromUuid: `select id from persons where u_uuid=:uuid`,
  getPersons: `select u_uuid as uuid,first_name,last_name,address,designation,
  company,phone,email from persons 
  where 
  (
    case 
      when :is_search 
      then upper(concat (first_name,' ',last_name)) like upper(:search) or 
           upper(company) like upper(:search) or
           upper(designation) like upper(:search) or
           upper(phone) like upper(:search) 
      else true end
  )
  offset :offset limit :limit  
  `,

  getPersonCount: `select count(*) from persons
  where 
  (
    case 
      when :is_search 
      then upper(concat (first_name,' ',last_name)) like upper(:search) or 
           upper(company) like upper(:search) or
           upper(designation) like upper(:search) or 
           upper(phone) like upper(:search) 
      else true end
  )
  `,
  getRoughList: `select u_uuid as rough_id,rough_name,weight,dollar,
  (
    case 
      when :user_type='admin' 
      then price 
      else null end
  ) as price,unit,purchase_date 
  from roughs 
  where 
  (
    case 
        when :is_search 
        then upper(rough_name) like upper(:search) 
        else true end
  ) 
  offset :offset limit :limit
  `,

  getLotHistoryData: `select * from lot_history where id=:history_id`,
  getRoughCount: `select count(*) from roughs 
  where
  (
    case 
      when :is_search 
      then upper(rough_name) like upper(:search) 
      else true end
  )
`,
  getLotList: `select l.u_uuid as lot_id,r.u_uuid as rough_id,l.lot_name,
  l.weight,l.unit,r.rough_name from lot_data as l
  inner join roughs as r on r.id=l.rough_id where l.rough_id=:rough_id`,

  getLotData: `select * from lot_data where id=:lot_id`,

  qGetLotCurrentStatus: `
  with last_status as (
    select max(id),lot_id from lot_history group by lot_id
  ),
  all_data as (
    select r.u_uuid as rough_id,r.dollar,
    l.u_uuid as lot_id,l.lot_name,r.rough_name,r.weight,r.unit,
    l.weight as lot_weight,l.unit as lot_unit,
    (
      case when :user_type='admin'
      then r.price else null end
    ) as price,status,start_date,end_date,submitted_to_person_id,
    p.first_name,p.last_name, s.first_name as submitted_first_name,
    s.last_name as submitted_last_name,p.u_uuid as person_id
    from 
    lot_history as h 
    inner join last_status as ls on ls.max=h.id 
    inner join persons as  p on p.id = h.person_id
    left join persons as  s on s.id = h.submitted_to_person_id
    right join lot_data as l on h.lot_id=l.id
    inner join roughs as r on r.id=l.rough_id 
    where
     (
      case
        when :is_search 
        then upper(r.rough_name) like upper(:search) 
        else true end
      )  offset :offset limit :limit
  )
  select * from all_data order by rough_name,lot_name`,

  qGetTotalLotCount: `select count(*) from lot_data as l 
  left join roughs as r  on r.id=l.rough_id 
  where
  (
    case 
      when :is_search 
      then upper(r.rough_name) like upper(:search) 
      else true end
  )`,
  getLatestLotStatus: `select status,end_date from lot_history 
  where lot_id=:lot_id order by id desc;`,
  qGetRoughCurrentStatusByRoughId: `
    with last_status as (
      select max(id),lot_id from lot_history where lot_id=:lot_id
      group by lot_id
    ),
    all_data as (
      select h.id,h.u_uuid as history_id,l.lot_name,r.rough_name,
      r.price,status,start_date,end_date,
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
  getLotHistory: `select l.lot_name,r.rough_name,h.id,l.u_uuid as lot_id,
    h.labour_rate,h.dollar,
    sum(
      case when stp.weight is not null 
      then (h.labour_rate::float * stp.weight::float)
      else (h.labour_rate::float * l.weight::float) end
      ) as total_labour,
      sum(
        case when stp.weight is not null then (stp.weight::float)
        else (l.weight::float) end
        ) as total_weight,
    r.u_uuid as rough_id,
    h.u_uuid as history_id,p.first_name,p.last_name,
    s.first_name as submitted_first_name,s.last_name as submitted_last_name,
    status,start_date,end_date 
    from lot_history as h 
    inner join persons p on h.person_id=p.id
    left join persons s on h.submitted_to_person_id=s.id
    inner join lot_data l on l.id=h.lot_id
    left join stone_to_process as stp on stp.history_id=h.id
    inner join roughs as r on r.id=l.rough_id
    where h.lot_id=:lot_id 
    group by
    l.lot_name,r.rough_name,l.u_uuid,
    h.labour_rate,h.dollar,
    h.total_weight,
    r.u_uuid,h.id,
    h.u_uuid,p.first_name,p.last_name,
    s.first_name,s.last_name,
    status,start_date,end_date 
    order by h.id desc`,

  getLotTotalLabourForLot: `select 
  sum(
  case when stp.weight is not null 
  then (lh.labour_rate::float * stp.weight::float)
  else (lh.labour_rate::float * l.weight::float) end
  ) as total_labour,
  sum(
  case when stp.weight is not null then (stp.weight::float)
  else (l.weight::float) end
  ) as total_weight  
 from lot_history as lh
 inner join lot_data as l on lh.lot_id=l.id
 left join stone_to_process as stp on stp.history_id=lh.id
 where lh.lot_id=:lot_id`,

  qGetStoneCurrentStatus: `
  with last_status as (
    select max(id),lot_id,stone_id from stone_history group by lot_id,stone_id
  ),
  all_data as (
    select 
    sh.u_uuid as stone_history_id,
    r.rough_name,
    l.u_uuid as lot_id,
    l.lot_name,
    s.u_uuid as stone_id,
    s.stone_name,
    s.weight,
    s.unit,
    lh.u_uuid as history_id,
    lh.start_date,
    lh.end_date,
    lh.status,
    p.first_name,
    p.last_name,
    sp.first_name as submitted_first_name,
    sp.last_name as submitted_last_name
    from stone_history as sh 
    inner join stones as s on s.id=sh.stone_id 
    inner join last_status as ls on ls.max=sh.id 
    inner join lot_data as l on sh.lot_id=l.id
    inner join roughs as r on r.id=l.rough_id
    inner join lot_history as lh on sh.history_id=lh.id
    inner join persons as  p on p.id = lh.person_id
    left join persons as  sp on sp.id = lh.submitted_to_person_id
    where
    (
     case
       when :is_search 
       then upper(r.rough_name) like upper(:search) 
       else true end
     )
     and s.have_child=false
     offset :offset limit :limit
    
  )
  select * from all_data order by rough_name,lot_name,stone_name`,

  qGetTotalStoneCount: `select count(*) from stones as s
  inner join lot_data as l on l.id=s.lot_id
  inner join roughs as r  on r.id=l.rough_id 
  where
  (
    case 
      when :is_search 
      then upper(r.rough_name) like upper(:search) 
      else true end
  )`,

  getStoneHistory: `select 
  lh.status,
  lh.start_date,
  lh.end_date,
  lh.status,
  lh.labour_rate,
  s.id,
  p.first_name,
  p.last_name,
  sp.first_name as submitted_first_name,
  sp.last_name as submitted_last_name,
  stp.weight,
  (stp.weight::float * lh.labour_rate::float) as total_labour
  from stone_history as sh 
  inner join lot_history as lh on sh.history_id=lh.id
  inner join stones as s on sh.stone_id=s.id
  left join stone_to_process as stp
   on sh.history_id=stp.history_id and s.stone_name=stp.stone_name
  inner join persons as  p on p.id = lh.person_id
  left join persons as  sp on sp.id = lh.submitted_to_person_id
  where sh.stone_id=:stone_id order by sh.id desc`,

  getRoughDetail: `select r.id,r.u_uuid as rough_id,
  rough_name,weight,unit,status from roughs as r 
  left join lot_history as h  on r.id=h.rough_id
  where r.rough_id=:rough_id
  `,

  getPlanDetailOfRough: `
  with latest_plan as (
    select max(history_id) from plan_result where lot_id=:lot_id group by lot_id
  )
  select p.u_uuid as plan_id,p.stone_name,p.weight,p.unit,
  p.history_id,h.u_uuid as history_uuid from plan_result as p
  inner join lot_history as h on h.id=p.history_id 
  where history_id in (select max from latest_plan)`,

  getPlanDetailForHistoryId: `select * from plan_result 
  where history_id=:history_id`,
  getLsDetailOfRough: `
  with latest_plan as (
    select max(history_id) from ls_result where lot_id=:lot_id group by lot_id
  )
  select l.u_uuid,l.stone_name,l.weight,l.unit,
  l.history_id,h.u_uuid as history_uuid from ls_result as l 
  inner join lot_history as h on h.id=l.history_id 
  where l.history_id in (select max from latest_plan)`,
  getLsDetailForHistoryId: `select * from ls_result
   where history_id=:history_id`,

  getBlockDetailOfRough: `
  with latest_plan as (
    select max(history_id) from block_result 
    where lot_id=:lot_id group by lot_id
  )
  select b.u_uuid,b.stone_name,b.weight,b.unit,b.history_id,
  h.u_uuid as history_uuid from block_result as b
  inner join lot_history as h on h.id=b.history_id 
  where b.history_id in (select max from latest_plan)`,
  getBlockDetailForHistoryId: `select * from block_result
   where history_id=:history_id`,

  getHphtDetailOfRough: `
   with latest_plan as (
     select max(history_id) from hpht_result where lot_id=:lot_id group by lot_id
   )
   select p.u_uuid as plan_id,p.stone_name,p.weight,p.unit,
   p.history_id,h.u_uuid as history_uuid from hpht_result as p
   inner join lot_history as h on h.id=p.history_id 
   where history_id in (select max from latest_plan)`,

  getHphtDetailForHistoryId: `select * from hpht_result 
   where history_id=:history_id`,

  getPlanDetailOfRoughBasedOnHistoryId: `
  select u_uuid as uuid,stone_name,weight,unit,cut,shape,color,purity,
  history_id from plan_result 
  where  lot_id=:lot_id and history_id=:history_id`,

  getLsDetailOfRoughBasedOnHistoryId: `
  select u_uuid as uuid,stone_name,weight,unit,cut,shape,color,purity,
  history_id from ls_result 
  where lot_id=:lot_id and history_id=:history_id`,

  getBlockDetailOfRoughBasedOnHistoryId: `
  select u_uuid as uuid,stone_name,weight,unit,cut,shape,color,purity,
  history_id from block_result
  where lot_id=:lot_id and history_id=:history_id`,

  getHphtDetailOfRoughBasedOnHistoryId: `
  select u_uuid as uuid,stone_name,weight,unit,cut,shape,color,purity,
  history_id from hpht_result
  where lot_id=:lot_id and history_id=:history_id`,

  insertRough: `insert into roughs (u_uuid,rough_name,price,
    weight,unit,purchase_date,dollar,
    is_active,is_deleted,created_by,updated_by,created_at,updated_at) 
    values (
      :uuid,:rough_name,:price,:weight,:unit,:purchase_date,:dollar,
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
    let q = `update roughs set updated_at=:updated_at,updated_by=:updated_by`;

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
    if (replacement.dollar) {
      q += `,dollar=:dollar`;
    }

    if (replacement.purchase_date) {
      q += `,purchase_date=:purchase_date`;
    }

    q += ` where id=:rough_id`;
    return q;
  },

  updateLotData: replacement => {
    let q = `update lot_data set updated_at=:updated_at,updated_by=:updated_by`;
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

  insertPerson: `insert into persons 
  (u_uuid,first_name,last_name,email,phone,address,designation,
    company,is_active,is_deleted,created_at,updated_at,created_by,updated_by) 
    values (
      :uuid,:first_name,:last_name,:email,:phone,:address,:designation,
      :company,:is_active,:is_deleted,:created_at,:updated_at,
      :created_by,:updated_by
    )`,

  updatePerson: replacement => {
    let q = `update persons set updated_at=:updated_at,updated_by=:updated_by`;
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

  insertLotHistory: `insert into lot_history 
  (u_uuid,lot_id,status,person_id,start_date,
    is_active,is_deleted,created_by,updated_by,created_at,updated_at) 
    values (
      :uuid,:lot_id,:status,:person_id,:start_date,
      :is_active,:is_deleted,:created_by,:updated_by,:created_at,:updated_at
    ) returning id`,

  updateLotHistory: replacement => {
    let q = `update  lot_history 
    set updated_at=:updated_at,updated_by=:updated_by`;
    if (replacement.end_date) {
      q += `,end_date=:end_date`;
    }
    if (replacement.labour_rate) {
      q += `,labour_rate=:labour_rate`;
    }
    if (replacement.total_labour) {
      q += `,total_labour=:total_labour`;
    }
    if (replacement.total_weight) {
      q += `,total_weight=:total_weight`;
    }
    if (replacement.labour_history_id) {
      q += `,labour_history_id=:labour_history_id`;
    }
    if (replacement.dollar) {
      q += `,dollar=:dollar`;
    }
    if (replacement.submitted_to_person_id) {
      q += `,submitted_to_person_id=:submitted_to_person_id`;
    }
    q += ` where id=:history_id`;
    return q;
  },
  insertPlanResult: `insert into plan_result 
   (u_uuid, stone_name,lot_id,weight,unit,cut,shape,color,purity,history_id,
    is_active,is_deleted,created_by,updated_by,created_at,updated_at) 
    values (
      :uuid,:stone_name,:lot_id,:weight,:unit,:cut,:shape,:color,:purity,
      :history_id,
      :is_active,:is_deleted,:created_by,:updated_by,:created_at,:updated_at
    )`,

  updatePlanResult: replacement => {
    let q = `update plan_result 
    set updated_at=:updated_at,updated_by=:updated_by`;
    if (replacement.stone_name) {
      q += `,stone_name=:stone_name`;
    }
    if (replacement.weight) {
      q += `,weight=:weight`;
    }
    if (replacement.unit) {
      q += `,unit=:unit`;
    }
    if (replacement.cut) {
      q += `,cut=:cut`;
    }
    if (replacement.shape) {
      q += `,shape=:shape`;
    }
    if (replacement.color) {
      q += `,color=:color`;
    }
    if (replacement.purity) {
      q += `,purity=:purity`;
    }
    if (replacement.hasOwnProperty("is_active")) {
      q += `,is_active=:is_active`;
    }
    if (replacement.hasOwnProperty("is_deleted")) {
      q += `,is_deleted=:is_deleted`;
    }
    q += ` where u_uuid=:uuid`;
    return q;
  },
  insertLsResult: `insert into ls_result 
  (u_uuid,lot_id,history_id,stone_name,weight,unit,
    cut,shape,color,purity,
    is_active,is_deleted,created_by,updated_by,created_at,updated_at) 
    values(
      :uuid,:lot_id,:history_id,:stone_name,:weight,:unit,
      :cut,:shape,:color,:purity,
      :is_active,:is_deleted,:created_by,:updated_by,:created_at,:updated_at
    )`,
  updateLsResult: replacement => {
    let q = `update ls_result 
    set updated_at=:updated_at,updated_by=:updated_by`;
    if (replacement.stone_name) {
      q += `,stone_name=:stone_name`;
    }
    if (replacement.weight) {
      q += `,weight=:weight`;
    }
    if (replacement.unit) {
      q += `,unit=:unit`;
    }
    if (replacement.cut) {
      q += `,cut=:cut`;
    }
    if (replacement.shape) {
      q += `,shape=:shape`;
    }
    if (replacement.color) {
      q += `,color=:color`;
    }
    if (replacement.purity) {
      q += `,purity=:purity`;
    }
    if (replacement.hasOwnProperty("is_active")) {
      q += `,is_active=:is_active`;
    }
    if (replacement.hasOwnProperty("is_deleted")) {
      q += `,is_deleted=:is_deleted`;
    }
    q += ` where u_uuid=:uuid`;
    return q;
  },
  insertBlockResult: `insert into block_result 
  (u_uuid,lot_id,history_id,stone_name,weight,unit,
    cut,shape,color,purity,
      is_active,is_deleted,created_by,updated_by,created_at,updated_at) 
      values(
        :uuid,:lot_id,:history_id,:stone_name,:weight,:unit,
        :cut,:shape,:color,:purity,
        :is_active,:is_deleted,:created_by,:updated_by,:created_at,:updated_at
      )`,
  updateBlockResult: replacement => {
    let q = `update block_result
     set updated_at=:updated_at,updated_by=:updated_by`;
    if (replacement.stone_name) {
      q += `,stone_name=:stone_name`;
    }
    if (replacement.weight) {
      q += `,weight=:weight`;
    }
    if (replacement.unit) {
      q += `,unit=:unit`;
    }
    if (replacement.cut) {
      q += `,cut=:cut`;
    }
    if (replacement.shape) {
      q += `,shape=:shape`;
    }
    if (replacement.color) {
      q += `,color=:color`;
    }
    if (replacement.purity) {
      q += `,purity=:purity`;
    }
    if (replacement.hasOwnProperty("is_active")) {
      q += `,is_active=:is_active`;
    }
    if (replacement.hasOwnProperty("is_deleted")) {
      q += `,is_deleted=:is_deleted`;
    }
    q += ` where u_uuid=:uuid`;
    return q;
  },

  insertHpHtResult: `insert into hpht_result 
  (u_uuid,lot_id,history_id,stone_name,weight,unit,
    cut,shape,color,purity,
      is_active,is_deleted,created_by,updated_by,created_at,updated_at) 
      values(
        :uuid,:lot_id,:history_id,:stone_name,:weight,:unit,
        :cut,:shape,:color,:purity,
        :is_active,:is_deleted,:created_by,:updated_by,:created_at,:updated_at
      )`,
  updateHphtResult: replacement => {
    let q = `update hpht_result
     set updated_at=:updated_at,updated_by=:updated_by`;
    if (replacement.stone_name) {
      q += `,stone_name=:stone_name`;
    }
    if (replacement.weight) {
      q += `,weight=:weight`;
    }
    if (replacement.unit) {
      q += `,unit=:unit`;
    }
    if (replacement.cut) {
      q += `,cut=:cut`;
    }
    if (replacement.shape) {
      q += `,shape=:shape`;
    }
    if (replacement.color) {
      q += `,color=:color`;
    }
    if (replacement.purity) {
      q += `,purity=:purity`;
    }
    if (replacement.hasOwnProperty("is_active")) {
      q += `,is_active=:is_active`;
    }
    if (replacement.hasOwnProperty("is_deleted")) {
      q += `,is_deleted=:is_deleted`;
    }
    q += ` where u_uuid=:uuid`;
    return q;
  },

  insertStoneToProcess: `insert into stone_to_process (u_uuid,history_id,lot_id,
    stone_name,weight,unit,cut,shape,color,purity,
    created_by,updated_by,created_at,updated_at)
    values (:uuid,:history_id,:lot_id,
      :stone_name,:weight,:unit,:cut,:shape,:color,:purity,
      :created_by,:updated_by,:created_at,:updated_at)
    `,

  updateStoneToProcess: replacement => {
    let q = `update stone_to_process
       set updated_at=:updated_at,updated_by=:updated_by`;
    if (replacement.stone_name) {
      q += `,stone_name=:stone_name`;
    }
    if (replacement.weight) {
      q += `,weight=:weight`;
    }
    if (replacement.unit) {
      q += `,unit=:unit`;
    }
    if (replacement.cut) {
      q += `,cut=:cut`;
    }
    if (replacement.shape) {
      q += `,shape=:shape`;
    }
    if (replacement.color) {
      q += `,color=:color`;
    }
    if (replacement.purity) {
      q += `,purity=:purity`;
    }
    if (replacement.hasOwnProperty("is_active")) {
      q += `,is_active=:is_active`;
    }
    if (replacement.hasOwnProperty("is_deleted")) {
      q += `,is_deleted=:is_deleted`;
    }
    q += ` where u_uuid=:uuid`;
    return q;
  },

  getLastHistoryIdToUpdateStone: `select max(id)  from lot_history 
  where (status='ls' or status='block') 
  and end_date is not null and lot_id=:lot_id`,

  insertStone: `insert into stones (u_uuid,rough_id,lot_id,
    stone_name,weight,unit,cut,shape,color,purity,status,have_child,parent_id,
    created_by,updated_by,created_at,updated_at)
    values
    (:uuid,:rough_id,:lot_id,
      :stone_name,:weight,:unit,:cut,:shape,:color,:purity,
      :status,:have_child,:parent_id,
      :created_by,:updated_by,:created_at,:updated_at)
    `,

  updateStones: replacement => {
    let q = `update stones
         set updated_at=:updated_at,updated_by=:updated_by`;
    if (replacement.stone_name) {
      q += `,stone_name=:stone_name`;
    }
    if (replacement.weight) {
      q += `,weight=:weight`;
    }
    if (replacement.unit) {
      q += `,unit=:unit`;
    }
    if (replacement.cut) {
      q += `,cut=:cut`;
    }
    if (replacement.shape) {
      q += `,shape=:shape`;
    }
    if (replacement.color) {
      q += `,color=:color`;
    }
    if (replacement.purity) {
      q += `,purity=:purity`;
    }
    if (replacement.status) {
      q += `,status=:status`;
    }
    if (replacement.hasOwnProperty("have_child")) {
      q += `,have_child=:have_child`;
    }
    if (replacement.hasOwnProperty("is_active")) {
      q += `,is_active=:is_active`;
    }
    if (replacement.hasOwnProperty("is_deleted")) {
      q += `,is_deleted=:is_deleted`;
    }
    q += ` where stone_name=:stone_name and lot_id=:lot_id`;
    return q;
  },

  getStoneId: `select * from stones 
  where stone_name=:stone_name and lot_id=:lot_id`,

  getStoneList: `select stone_name,weight,unit,cut,shape,color,purity
   from stones 
  where lot_id=:lot_id and have_child is not true`,

  getStoneToProcessData: `select u_uuid as uuid,stone_name,weight,unit,
  cut,shape,color,purity 
  from stone_to_process 
  where history_id=:history_id and is_active=true and is_deleted=false`,

  insertStoneHistory: `insert into stone_history 
  (u_uuid,history_id,lot_id,stone_id,
    created_by,updated_by,created_at,updated_at)
    values (:uuid,:history_id,:lot_id,:stone_id,
      :created_by,:updated_by,:created_at,:updated_at)
    `,

  insertActivityLog: `insert into activity_log 
  (u_uuid,table_name,replacement,result,operation,created_at,updated_at,
    created_by,updated_by)
  values (:u_uuid,:table_name,:replacement,:result,:operation,
    :created_at,:updated_at,:created_by,:updated_by)`,

  getPolishDiamondDetail: `select stone_name,weight,unit from stones as s 
    inner join stone_history as sh on sh.stone_id=s.id
    inner join lot_history as lh on lh.id=sh.history_id
    where lh.status='polish' and lh.end_date is not null and lh.lot_id=:lot_id`
  // insertRoughHistory: `insert into lot_history(uuid)`
};
