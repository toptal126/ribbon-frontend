import { parseUnits } from "ethers/lib/utils";
import { useMemo } from "react";
import { Subtitle } from "shared/lib/designSystem";
import colors from "shared/lib/designSystem/colors";
import sizes from "shared/lib/designSystem/sizes";
import useLoadingText from "shared/lib/hooks/useLoadingText";
import { useAssetBalance } from "shared/lib/hooks/web3DataContext";
import { formatBigNumber } from "shared/lib/utils/math";
import styled from "styled-components";

const Container = styled.div.attrs({
  className: "d-flex justify-content-between align-items-center px-3 py-2",
})`
  @media (min-width: ${sizes.md}px) {
    display: none !important;
  }
`;

const MobileVeRBNBalance = () => {
  const { balance, loading } = useAssetBalance("veRBN");
  const loadingText = useLoadingText();

  const displayBalance = useMemo(() => {
    if (loading) {
      return loadingText;
    }
    return formatBigNumber(balance);
  }, [loading, loadingText, balance]);

  return (
    <Container>
      <Subtitle normalCased fontSize={10} color={`${colors.primaryText}7A`}>
        veRBN BALANCE
      </Subtitle>
      <Subtitle fontSize={14}>{displayBalance}</Subtitle>
    </Container>
  );
};

export default MobileVeRBNBalance;
