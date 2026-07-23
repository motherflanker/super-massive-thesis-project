interface IUser {
  name: string,
  surname: string,
  patronymic:	string | null,
  birth_date:	Date,
  phone: string	
  email: string,	
  password:	string
  role_id: number	
  email_verified_at: Date	| null
  remember_token:	string | null
}

export default IUser