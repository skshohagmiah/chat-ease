import PeopleList from "@/components/PeopleList";
import WelcomePage from "@/components/WelcomePage";
import { getAllUsers } from "@/libs/getAllUser";
import React from "react";

const PeoplePage = async () => {
  const users = await getAllUsers();

  return (
    <div className="flex justify-between">
      <PeopleList data={users!} />
      <div className="ml-20 hidden md:block">
        <WelcomePage />
      </div>
    </div>
  );
};

export default PeoplePage;
