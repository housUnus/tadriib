import subprocess
import json

def get_video_duration_seconds(file_path: str) -> int:
    result = subprocess.run(
        [
            "ffprobe",
            "-v", "error",
            "-show_entries", "format=duration",
            "-of", "json",
            file_path,
        ],
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True,
    )

    data = json.loads(result.stdout)
    return int(float(data["format"]["duration"]))