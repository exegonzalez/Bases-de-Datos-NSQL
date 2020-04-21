import requests
from agent.credentials import coinmarketcap
from requests.exceptions import ConnectionError, Timeout, TooManyRedirects
import json

coinmarketcap_url_base = 'https://pro-api.coinmarketcap.com'

def fetch_listings(start, limit):
  try:
      response = requests.get(f'{coinmarketcap_url_base}/v1/cryptocurrency/listings/latest?start={start}&limit={limit}&CMC_PRO_API_KEY={coinmarketcap}')
      listings = json.loads(response.text, parse_int=str, parse_float=str)
      return [{'cmc_rank': thing['cmc_rank'], 'data': thing} for thing in listings['data']]
  except (ConnectionError, Timeout, TooManyRedirects) as e:
      return e


