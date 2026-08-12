import AppCard from "../AppCard";
import AppText from "../AppText";

import { MoneyCardProps } from "./types";
import { styles } from "./styles";

export default function MoneyCard({
  title,

  amount,

  prefix = "S/",
}: MoneyCardProps) {
  return (
    <AppCard style={styles.container}>
      <AppText bold style={styles.title}>
        {title}
      </AppText>

      <AppText variant="title" bold style={styles.amount}>
        {prefix} {amount.toFixed(2)}
      </AppText>
    </AppCard>
  );
}
