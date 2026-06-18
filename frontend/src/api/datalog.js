export async function getDatalog(cdl) {
  const res = await fetch(`http://localhost:3000/api/datalog/${cdl}`);
  return res.json();
}
