type Pogs = {
  id: number;
  name: string;
  current_price: number;
  previous_price: number;
  color: string;
  ticker_symbol: string;
};

type Users = {
  id: number;
  name: string;
  email: string;
  password: string;
  is_admin: boolean;
  wallet: number;
};

type UserPogs = {
  id: number;
  pogs_id: number;
  user_id: number;
}

export type { Pogs, Users, UserPogs };
