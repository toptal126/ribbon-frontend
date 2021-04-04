import React, { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import moment from "moment";

import { SecondaryText, Title } from "../../designSystem";
import colors from "../../designSystem/colors";
import PerformanceChart from "../../components/PerformanceChart/PerformanceChart";
import { HoverInfo } from "../../components/PerformanceChart/types";
import useAirtableData from "../../hooks/useAirtableData";

const VaultPerformacneChartContainer = styled.div`
  border: 1px solid ${colors.border};
  border-radius: 4px;
`;

const APYLabel = styled(SecondaryText)`
  font-size: 12px;
`;

const APYNumber = styled(Title)`
  font-size: 28px;
  line-height: 36px;
`;

interface DateFilterProps {
  active: boolean;
}

const DateFilter = styled(Title)<DateFilterProps>`
  font-size: 12px;
  letter-spacing: 1.5px;
  cursor: pointer;
  color: ${(props) => (props.active ? "#FFFFFF" : "rgba(255, 255, 255, 0.4)")};
`;

const VaultPerformanceChart: React.FC = () => {
  const airtableData = useAirtableData();
  const yields = airtableData.res.map((data) => data.cumYield);
  const timestamps = airtableData.res.map((data) => new Date(data.timestamp));

  // states
  const [monthFilter, setMonthFilter] = useState(true);
  const [chartIndex, setChartIndex] = useState(0);

  const yieldLen = yields.length;

  useEffect(() => {
    if (yieldLen) {
      setChartIndex(yieldLen - 1);
    }
  }, [yieldLen]);

  // Comment out month changes while data is < 5 rows
  // const aMonthFromNow = moment(new Date()).subtract(1, "months");
  // const dataset = monthFilter
  //   ? yields.filter((_, index) => {
  //       return moment(timestamps[index]).isAfter(aMonthFromNow);
  //     })
  //   : yields;
  // const labels = monthFilter
  //   ? timestamps.filter((date) => {
  //       return moment(date).isAfter(aMonthFromNow);
  //     })
  //   : timestamps;

  const handleChartHover = useCallback(
    (hoverInfo: HoverInfo) => {
      if (hoverInfo.focused) {
        setChartIndex(hoverInfo.index);
      } else {
        setChartIndex(yields.length - 1);
      }
    },
    [yields]
  );

  // formatted data
  const perfStr = yields.length ? `${yields[chartIndex].toFixed(2)}%` : `0%`;

  return (
    <VaultPerformacneChartContainer
      className="pt-4"
      style={{ paddingBottom: 40 }}
    >
      <PerformanceChart
        dataset={yields}
        labels={timestamps}
        onChartHover={handleChartHover}
        extras={
          <div className="d-flex align-items-center justify-content-between mb-3 px-4">
            <div>
              <APYLabel className="d-block">Yield (Cumulative)</APYLabel>
              <APYNumber>{perfStr}</APYNumber>
            </div>
            <div>
              {/* <DateFilter
                active={monthFilter}
                className="mr-3"
                onClick={() => setMonthFilter(true)}
              >
                1m
              </DateFilter> */}
              <DateFilter
                active={monthFilter}
                onClick={() => setMonthFilter(false)}
              >
                All
              </DateFilter>
            </div>
          </div>
        }
      />
    </VaultPerformacneChartContainer>
  );
};

export default VaultPerformanceChart;
