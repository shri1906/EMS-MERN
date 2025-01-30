export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
  },
  {
    name: "Department Name",
    selector: (row) => row.dep_name,
  },
  {
    name: "Action",
    selector: (row) => row.action,
  },
];

export const DepartmentButtons =() =>{
     return (
        <div>
            <butoon>Edit</butoon>
            <butoon>Delete</butoon>
        </div>
     )
}