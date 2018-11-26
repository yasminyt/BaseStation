/** create user table **/
drop table if exists user;
create table user (
    tel      text    primary key,
    password text    not null,
    disabled integer not null,
    name     text    not null,
    sex      text    not null,
    age      integer not null,
    role     text    
);

/** create tower table **/
drop table if exists tower;
create table tower (
    code     text  primary key,
    name     text  not null,
    address  text  not null,
    lat      real  not null,
    lng      real  not null,
    type     text
);

/** create job table **/
drop table if exists job;
create table job (
    job_id           integer  primary key autoincrement,
    created_user     text     not null,
    created_time     text     not null,
    inspection_date  text     not null,
    completed        integer  not null  default 0,
    abnormal         integer  not null  default 0,
    process          text,
    user_id          text,
    tower_code       text,
    foreign key(created_user) references user(tel),
    foreign key(user_id) references user(tel),
    foreign key(tower_code) references tower(code)
);

/** create task table **/
drop table if exists task;
create table task (
    task_id        integer  primary key autoincrement,
    completed      integer  not null  default 0,
    abnormal       integer  not null  default 0,
    output         text,
    completed_time text,
    lat            real,
    lng            real,
    job_id         integer  not null,
    item_id        integer  not null,
    foreign key(job_id) references job(job_id),
    foreign key(item_id) references task_item(item_id)
);

/** create shot table **/
drop table if exists shot;
create table shot (
    shot_id        integer   primary key autoincrement,
    photo_path     text      not null,
    created_time   text      not null,
    output         text      not null,
    task_id        integer   not null,
    foreign key(task_id) references task(task_id)
);

/** create task items table **/
drop table if exists task_item;
create table task_item (
    item_id     integer primary key autoincrement,
    name        text    not null
);

/** create view about abnormal tasks **/
drop view if exists abnormalView;
create view abnormalView as
    select task_id taskId, user.tel userId, user.name userName, tower.code towerId, tower.name towerName, 
           task_item.item_id itemId, task_item.name itemName, inspection_date inspectionDate, output 
    from task, job, task_item, user, tower 
    where task.abnormal=1 and task.job_id=job.job_id and task.item_id=task_item.item_id and  
          job.user_id=user.tel and job.tower_code=tower.code;

/** insert manager's record in user table **/

/** insert 5 records in task_item table **/
insert into task_item (name) values('拍摄电表读数');
insert into task_item (name) values('拍摄电表输入');
insert into task_item (name) values('拍摄电表输出');
insert into task_item (name) values('拍摄防雷');
insert into task_item (name) values('拍摄空调');
