import {
  Card
} from "@material-tailwind/react";
 
export function AddUser() {
  return (
    <> 
    <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url('/img/background-image.png')] bg-cover	bg-center">
        <div className="absolute inset-0 h-full w-full bg-gray-900/75" />
      </div>
      <Card>
        <p>Hi Ramu & Sai- Add User</p>
      </Card>
    </>
  );
}

export default AddUser;
