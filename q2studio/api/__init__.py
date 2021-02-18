# ----------------------------------------------------------------------------
# Copyright (c) 2016-2021, QIIME 2 development team.
#
# Distributed under the terms of the Modified BSD License.
#
# The full license is in the file LICENSE, distributed with this software.
# ----------------------------------------------------------------------------

from .jobs import jobs as jobs_bp
from .plugins import plugins as plugins_bp
from .types import types as types_bp
from .formats import formats as formats_bp
from .workspace import workspace as workspace_bp

__all__ = ['jobs_bp', 'plugins_bp', 'types_bp', 'formats_bp', 'workspace_bp']
