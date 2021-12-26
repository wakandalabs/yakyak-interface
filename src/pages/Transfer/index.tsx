import {Stack} from "@chakra-ui/react";
import {TabMenuItem} from "../../components/TabMenuItem";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Pay} from "./Pay";
import {More} from "./More";
import {Request} from "./Request";

export const Transfer = () => {
  const tabList = [
    {label: "Pay", action: "pay", path: "/transfer/pay", element: <Pay/>},
    {label: "Get Rewards", action: "request", path: "/transfer/request", element: <Request/>},
    {label: "More", action: "more", path: "/transfer/more", element: <More/>},
  ]
  const navigate = useNavigate()
  const params = useParams()
  const [currentPath, setCurrentPath] = useState("/transfer/pay")

  useEffect(() => {
    if (params?.action) {
      setCurrentPath("/transfer/" + params.action)
    }
  }, [navigate, params])

  return (
    <Stack w={"full"}>
      <Stack h={"60px"} bg={"white"} direction={"row"} justifyContent={"center"} alignItems={"center"}
             borderBottomWidth={"1px"} borderBottomColor={"divider"}>
        {
          tabList.map((tab) => (
            <TabMenuItem key={tab.label} label={tab.label} activated={currentPath === tab.path}
                         onClick={() => {
                           navigate(tab.path)
                         }}/>
          ))
        }
      </Stack>
      {
        tabList.map((tab) => (
          <Stack key={tab.label} hidden={currentPath !== tab.path }>
            {tab.element}
          </Stack>
        ))
      }
    </Stack>
  )
}

export default Transfer