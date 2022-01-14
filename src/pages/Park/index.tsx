import {Input, Spacer, Stack, Text} from "@chakra-ui/react";
import {useYakYakRewards} from "../../hooks/useYakYakRewards";
import {useActiveWeb3React} from "../../hooks/web3";
import {useCallback, useEffect, useState} from "react";
import {formatNumber} from "../../utils/bignumberUtil";
import {atom, useRecoilState} from "recoil";
import {useYakYakClone} from "../../hooks/useYakYakClone";
import {PeriodItem} from "./PeriodItem";
import {AddNewPeriod} from "./AddNewPeriod";

const balanceAtom = atom({
  key: "my:balance",
  default: "NaN",
})

export const Park = () => {
  const { account } = useActiveWeb3React()
  const { balanceOf } = useYakYakRewards()
  const [balance, setBalance] = useRecoilState(balanceAtom)
  const { totalSupply, nextDnaID, nextPeriodID, currentSeries } = useYakYakClone()
  const [periods, setPeriods] = useState<number[]>([])

  const refresh = useCallback(async () => {
    if (account) {
      setBalance(formatNumber(await balanceOf(account)))
    }
  }, [account, balanceOf, setBalance])

  useEffect(()=>{
    refresh()
  }, [refresh])

  useEffect(()=> {

  }, [])

  const control = () => {
    return (
      <Stack h={"60px"} bg={"white"} alignItems={"center"} justifyContent={"center"}
             borderBottomWidth={"1px"} borderBottomColor={"divider"}>
        <Stack w={"full"} maxW={"1024px"} direction={"row"} alignItems={"center"} spacing={"60px"}>
          <Text fontSize={"14px"} fontWeight={"600"} color={"primary"}>YakYak Park</Text>
          <Text fontSize={"14px"} fontWeight={"600"} _hover={{ color: "primary" }}>Categories</Text>
          <Text fontSize={"14px"}>{balance} YKR </Text>
          <Spacer />
          <Input w={"200px"} placeholder={"Search"}/>
        </Stack>
      </Stack>
    )
  }

  return (
    <Stack w={"full"}>
      { control() }
      <Stack alignItems={"center"}>
        <Stack w={"full"} maxW={"1024px"} py={"12px"} direction={"row"} alignItems={"center"}>
          <Text>Current Series ID: {currentSeries} ;</Text>
          <Text>Next Period ID: {nextPeriodID} ;</Text>
          <Text>Next DNA ID: {nextDnaID} ;</Text>
          <Text>Total Supply: {totalSupply} ;</Text>
        </Stack>
        <Stack direction={"row"}>
          <PeriodItem periodID={0} />
          <PeriodItem periodID={1} />
          <PeriodItem periodID={2} />
        </Stack>
        <AddNewPeriod/>
      </Stack>
    </Stack>
  )
}



export default Park