from sqlalchemy import (
    Column,
    Index,
    Integer,
    Text,
    Unicode,
    )

from sqlalchemy.ext.declarative import declarative_base

from sqlalchemy.orm import (
    scoped_session,
    sessionmaker,
    )

from zope.sqlalchemy import ZopeTransactionExtension

DBSession = scoped_session(sessionmaker(extension=ZopeTransactionExtension()))
Base = declarative_base()


class MyModel(Base):
    __tablename__ = 'models'
    id = Column(Integer, primary_key=True)
    name = Column(Text)
    value = Column(Integer)

Index('my_index', MyModel.name, unique=True, mysql_length=255)

class Menus(Base):
    __tablename__ = 'menu'
    id = Column(Integer, primary_key=True)
    parent = Column(Integer)
    title = Column(Unicode(255))
    alias = Column(Unicode(255))
    
def getstartmenus(p):
    return DBSession.query(Menus).filter(Menus.parent == p).all()