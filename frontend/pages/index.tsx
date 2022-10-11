import type { NextPage } from 'next'
import axios, { AxiosError } from 'axios';
import { Dispatch, SetStateAction, useState } from 'react';
import { decrypt } from '../utils/aes256';

interface UserResponse {
  id: string;
  name: string;
}

const getUser = async (
  setEncryptedUser: Dispatch<SetStateAction<UserResponse>>,
  setDecryptedUser: Dispatch<SetStateAction<UserResponse>>
) => {
  try {
    const response = await axios.get<UserResponse>(`${process.env.NEXT_PUBLIC_BASE_URL}/user`);
    setEncryptedUser(response.data);
    setDecryptedUser({
      id: decrypt(response.data.id),
      name: decrypt(response.data.name)
    });
  } catch (e) {
    const err = e as AxiosError;
    console.log(err);
  }
}

const Home: NextPage = () => {
  const [encryptedUser, setEncryptedUser] = useState<UserResponse>({id: "null", name: "null"});
  const [decryptedUser, setDecryptedUser] = useState<UserResponse>({id: "null", name: "null"});

  return (
    <div>
      <h3>encryptedId: {encryptedUser.id} | encryptName: {encryptedUser.name}</h3>
      <h3>decryptedId: {decryptedUser.id} | decryptedName: {decryptedUser.name}</h3>
      <button type="button" onClick={() => getUser(setEncryptedUser, setDecryptedUser)}>GET USER</button>
    </div>
  )
}

export default Home
