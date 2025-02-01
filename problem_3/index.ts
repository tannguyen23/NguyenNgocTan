interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string; //  Ensure the interface includes `blockchain`, missing in the original code
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

interface Props extends BoxProps {}

const WalletPage: React.FC<Props> = (props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances(); // Hook to retrieve wallet balances
  const prices = usePrices(); // Hook to fetch currency prices

  //  Using an object map instead of a long switch-case for blockchain priority
  const getPriority = (blockchain: string): number => {
    const priorityMap: Record<string, number> = {
      Osmosis: 100,
      Ethereum: 50,
      Arbitrum: 30,
      Zilliqa: 20,
      Neo: 20,
    };
    return priorityMap[blockchain] ?? -99; //  Default to lowest priority if not found
  };

  //  useMemo optimizes performance by recalculating only when `balances` change
  const sortedBalances: FormattedWalletBalance[] = useMemo(() => {
    return balances
      .filter((balance) => getPriority(balance.blockchain) > -99 && balance.amount <= 0) //  Filtering only once

      //  Old code had unclear filtering logic with an undeclared `lhsPriority`:
      /*
        balances.filter((balance: WalletBalance) => {
          const balancePriority = getPriority(balance.blockchain);
          if (lhsPriority > -99) {   `lhsPriority` is not defined
            if (balance.amount <= 0) {
              return true;
            }
          }
          return false;
        })
      */

      .sort((lhs, rhs) => getPriority(rhs.blockchain) - getPriority(lhs.blockchain)) //  Use subtraction instead of multiple `if-else` checks

      //  Old code used unnecessary comparisons:
      /*
        .sort((lhs: WalletBalance, rhs: WalletBalance) => {
          const leftPriority = getPriority(lhs.blockchain);
          const rightPriority = getPriority(rhs.blockchain);
          if (leftPriority > rightPriority) {
            return -1;
          } else if (rightPriority > leftPriority) {
            return 1;
          }
        })
      */

      .map((balance) => ({
        ...balance,
        formatted: balance.amount.toFixed(2), //  Format numbers directly while processing instead of iterating again
      }));
  }, [balances]);

  return (
    <div {...rest}>
      {sortedBalances.map((balance) => (
        <WalletRow
          className={classes.row}
          key={balance.currency} //  Use `currency` as a key instead of index to prevent unnecessary re-renders

          //  Old code used index as key, which can cause issues when the list changes:
          /*
            key={index}
          */

          amount={balance.amount}
          usdValue={prices[balance.currency] * balance.amount} //  Avoid redundant calculations, compute directly in render
          formattedAmount={balance.formatted}
        />
      ))}
    </div>
  );
};
