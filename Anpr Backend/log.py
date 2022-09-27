
import logging
def get_logger(name):
    logging.basicConfig(filename="Anpr_Central.log",filemode="a",format='%(asctime)s %(levelname)-8s %(message)s',level=logging.INFO,datefmt='%Y-%m-%d %H:%M:%S')
    console = logging.StreamHandler()
    logging.getLogger(name).addHandler(console)
    return logging.getLogger(name)