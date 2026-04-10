-- Bảng users
create table users (
  id uuid primary key default gen_random_uuid(),
  clerk_id text unique not null,
  email text unique not null,
  full_name text,
  shop_name text,
  phone text,
  created_at timestamp with time zone default now()
);

-- Bảng subscriptions
create table subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  plan text not null check (plan in ('starter','pro','business','agency')),
  status text not null check (status in ('pending','active','expired','cancelled')),
  amount integer not null,
  start_date timestamp with time zone default now(),
  end_date timestamp with time zone,
  created_at timestamp with time zone default now()
);

-- Bảng bot_configs
create table bot_configs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  telegram_username text,
  bot_status text default 'inactive',
  activated_at timestamp with time zone,
  created_at timestamp with time zone default now()
);
