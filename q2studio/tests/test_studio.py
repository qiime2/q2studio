# ----------------------------------------------------------------------------
# Copyright (c) 2016-2021, QIIME 2 development team.
#
# Distributed under the terms of the Modified BSD License.
#
# The full license is in the file LICENSE, distributed with this software.
# ----------------------------------------------------------------------------

from unittest.mock import Mock

from ..server import studio

import pytest


@pytest.fixture
def client():
    with studio.test_client() as client:
        # reset the middleware funcs to unload security checks
        client.application.before_request_funcs = {}
        yield client


def test_get_workspace(client):
    response = client.get("/api/workspace/")
    assert response.status_code == 200


def test_get_importable_formats(client):
    response = client.post("/api/formats/importable")
    assert response.status_code == 200


def test_get_importable_types(client):
    response = client.post("/api/types/importable")
    assert response.status_code == 200


def test_create_artifact(client, monkeypatch):
    data = {"path": "path",
            "name": "out",
            "type": "EMPSingleEndSequences",
            "source_format": ""}

    with monkeypatch.context() as m:
        m.setattr("q2studio.api.workspace.Artifact", Mock())
        response = client.post("/api/workspace/artifacts", json=data)

    assert response.status_code == 200
