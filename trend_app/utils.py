from pytrends.request import TrendReq
import requests
from .models import Trend, TrendName


# get search data
def get_data(keyword, trend_type):
    # Connect to Google
    pytrend = TrendReq(hl='en-US', tz=360)

    # Build Payload for pytrends
    pytrend.build_payload(
        kw_list=[keyword],
        geo='US',
        timeframe='today 3-m',
        cat=0, gprop=''
    )

    # get the data from the api if intereset_by_region or get_historical_interest
    if trend_type == 'intereset_by_region':
        data = pytrend.interest_by_region(resolution='COUNTRY')
    elif trend_type == 'get_historical_interest':
        data = pytrend.interest_over_time()

    data = data.to_dict()[keyword]
    return data


# save to database
def save_to_database(keyword, data, search_type):
    # counter for number of items required in both searches
    new_counter = 0
    intereset_by_region_counter = 50
    get_historical_interest_counter = 15

    if search_type == "intereset_by_region":
        new_counter = intereset_by_region_counter
    elif search_type == 'get_historical_interest':
        new_counter = get_historical_interest_counter

    if search_type:
        trend_name = TrendName.objects.create(
            name=keyword, search_type=search_type)
        print(trend_name)
        counter = 0
        for k, v in data.items():
            # get only 51 results fot the states
            if counter > new_counter:
                counter = 0
                break
            Trend.objects.create(name=trend_name, region=str(
                k).split(" ")[0], interest=v)
            counter += 1
            print(counter)
        return True

    # if search_type == "intereset_by_region":
    #     trend_name = TrendName.objects.create(
    #         name=keyword, search_type=search_type)
    #     print(trend_name)
    #     counter = 0
    #     for k, v in data.items():
    #         # get only 51 results fot the states
    #         if counter > 50:
    #             counter = 0
    #             break
    #         Trend.objects.create(name=trend_name, region=str(
    #             k).split(" ")[0], interest=v)
    #         counter += 1
    #         print(counter)
    #     return True

    # elif search_type == 'get_historical_interest':
    #     trend_name = TrendName.objects.create(
    #         name=keyword, search_type=search_type)
    #     print(trend_name)
    #     counter = 0
    #     for k, v in data.items():
    #         # get only results for 15 dayes
    #         if counter > 15:
    #             counter = 0
    #             break
    #         Trend.objects.create(name=trend_name, date=str(
    #             k).split(" ")[0], interest=v)
    #         counter += 1
    #         print(counter)
    #     return True


# get data from api
def get_from_api(name=None, search_type=None):
    if name and search_type == 'get_historical_interest':
        return requests.get('http://127.0.0.1:8000/trend/api/trends/?name={}&type={}'.format(name, search_type)).json()

    elif type(name) == list and search_type == 'intereset_by_region':
        all_data = []
        for k in name:
            data = requests.get(
                'http://127.0.0.1:8000/trend/api/trends/?name={}&type={}'.format(k, search_type)).json()
            all_data.append(data)
        return all_data
    else:
        return None
