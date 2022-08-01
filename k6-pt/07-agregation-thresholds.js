import http from 'k6/http';
import { Trend, Rate, Counter, Gauge } from 'k6/metrics';
import { sleep } from 'k6';

export const TrendRTT = new Trend('RTT');
export const RateContentOK = new Rate('Content OK');
export const GaugeContentSize = new Gauge('ContentSize');
export const CounterErrors = new Counter('Errors');
export const options = {
  thresholds: {
    'Errors': ['count<100'],
    'ContentSize': ['value<4000'],
    'Content OK': ['rate>0.95'],
    'RTT': ['p(99)<300', 'p(70)<250', 'avg<200', 'med<150', 'min<100'],
  },
};

export default function () {
  const res = http.get('https://api.genderize.io/?name=luc');
  const contentOK = res.json('name') === 'luc';

  TrendRTT.add(res.timings.duration);
  RateContentOK.add(contentOK);
  GaugeContentSize.add(res.body.length);
  CounterErrors.add(!contentOK);

  sleep(1);
}

/*
    Counter	= count and rate
    Gauge =	value
    Rate = rate
    Trend = avg, min, max, med and p(N) where N is a number between 0.0 and 100.0 meaning the percentile 
            value to look at, e.g. p(99.99) means the 99.99th percentile. The unit for these values is 
            milliseconds.
*/