FROM public.ecr.aws/docker/library/golang:1.17

USER root
WORKDIR /opt

#
# tools
#

RUN apt update -y && apt install zip -y

COPY . .
RUN go build && chmod +x get-secrets-layer && zip layer.zip get-secrets-layer go-retrieve-secret && mv layer.zip /layer.zip

#
# create the bundle
#

RUN cd /opt \
    && echo "/layer.zip is ready" \
    && ls -alh /layer.zip;

WORKDIR /
ENTRYPOINT [ "/bin/bash" ]