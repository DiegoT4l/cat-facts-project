// CAT FACTS API: https://catfact.ninja/facts
// USERS API: https://randomuser.me/api/?inc=,name,picture&seed=38c36f5c3dccb94f

import {userType, catFactType} from "@/types";


export async function requestUsers() {
  const users = await fetch('https://randomuser.me/api/?results=20&?inc=,name,picture&seed=38c36f5c3dccb94f')
  const data = await users.json()
  return data.results as userType[];
}

export async function requestCatFacts() {
  const facts = await fetch('https://catfact.ninja/facts')
  const data = await facts.json()
  return data.data as catFactType[];
}