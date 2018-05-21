FROM mongo:3.4.2

ENV AUTH yes
ENV STORAGE_ENGINE wiredTiger
ENV JOURNALING yes


ADD ./set_mongodb_password.sh /bin/set_mongodb_password.sh
RUN chmod a+x /bin/set_mongodb_password.sh

ADD ./run.sh /bin/run.sh
RUN chmod a+x /bin/run.sh
