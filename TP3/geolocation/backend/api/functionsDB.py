from connectionDB import client

def generate_points():
    con = client()
    if(con.exists('gBreweries')==0):
        con.flushdb()
        con.geoadd('gBreweries',-58.2361143,-32.480575,'Drakkar',-58.2504781,-32.4773196,'Lagash',-58.2401659,-32.4812371,'Tractor')
        con.lpush('Breweries','Drakkar','Lagash','Tractor')
        con.geoadd('gUniversities',-58.2355213,-32.479067,'Uader fcyt',-58.2305606,-32.4846711,'Uader fhaycs',-58.2318001,-32.4958,'Utn frcu')
        con.lpush('Universities','Uader fcyt','Uader fhaycs','Utn frcu')
        con.geoadd('gPharmacy',-58.2351599,-32.4862249,'Alberdi',-58.2331543,-32.486659,'Suarez',-58.2366414,-32.485827,'Argentina')
        con.lpush('Pharmacy','Alberdi','Suarez','Argentina')
        con.geoadd('gEmergencies',-58.2369422,-32.4842218,'Alerta',-58.2331737,-32.483037,'Vida',-58.2389064,-32.479766,'Cooperativa Medica')
        con.lpush('Emergencies','Alerta','Vida','Cooperativa Medica')
        con.geoadd('gSupermarkets',-58.232506,-32.4892655,'Gran rex',-58.2439911,-32.4885239,'Dia',-58.246514,-32.4744789,'Impulso')
        con.lpush('Supermarkets','Gran rex','Dia','Impulso')
    return 'OK'

def add_point(point,longitude,latitude,name):
    con = client()
    con.geoadd('g'+point.capitalize(),longitude,latitude,name.capitalize())
    con.lpush(point.capitalize(),name.capitalize())
    return "Se agrego el local {0} al punto {1}".format(name.capitalize(),point.capitalize())

def user_radio(point,longitude,latitude):
    con = client()
    points = con.georadius('g'+point.capitalize(),longitude,latitude,5,unit='km',withdist=True)
    return points

def get_position(point,name):
    con = client()
    coordinates = con.geopos('g'+point.capitalize(),name.capitalize())
    return coordinates[0]

def get_local(point):
    con = client()
    local = []
    local = con.lrange(point.capitalize(),0,-1)
    return local

def get_points():
    con = client()
    aux = []
    points = []
    aux = con.keys(pattern='*')
    for x in aux:
        if(con.type(x)=='list'):
            points.append(x)
    return points

def get_local_points_with_data(point):
    con = client()
    sites = get_local(point)
    sites_with_coords = []
    for s in sites:
        coords = get_position(point, s)
        swc = {'name': s, 'lon':coords[0], 'lat': coords[1]}
        sites_with_coords.append(swc)
    return sites_with_coords