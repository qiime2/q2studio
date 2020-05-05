from unittest.mock import Mock

from ..server import studio

import pytest


@pytest.fixture
def client():
    studio.config['TESTING'] = True
    with studio.test_client() as client:
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
    monkeypatch.setattr("q2studio.api.workspace.Artifact", Mock())

    data = {"path": "path",
            "name": "out",
            "type": "EMPSingleEndSequences",
            "source_format": ""}

    response = client.post("/api/workspace/artifacts", json=data)
    assert response.status_code == 200

    # Make sure the request succeeds when the
    # optional `source_format` is missing
    data.pop("source_format")
    response = client.post("/api/workspace/artifacts", json=data)
    assert response.status_code == 200
