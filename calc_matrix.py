import cv2
import numpy as np

src = np.array([
    [0, 0],
    [700, 0],
    [700, 540],
    [0, 540]
], dtype=np.float32)

dst = np.array([
    [420, 70],
    [1114, 64],
    [1121, 630],
    [432, 597]
], dtype=np.float32)

matrix = cv2.getPerspectiveTransform(src, dst)

m00, m01, m02 = matrix[0]
m10, m11, m12 = matrix[1]
m20, m21, m22 = matrix[2]

a1, b1, c1, d1 = m00, m10, 0, m20
a2, b2, c2, d2 = m01, m11, 0, m21
a3, b3, c3, d3 = 0, 0, 1, 0
a4, b4, c4, d4 = m02, m12, 0, m22

css_matrix = [
    a1/m22, b1/m22, c1/m22, d1/m22,
    a2/m22, b2/m22, c2/m22, d2/m22,
    a3/m22, b3/m22, c3/m22, d3/m22,
    a4/m22, b4/m22, c4/m22, d4/m22
]

print("matrix3d(" + ", ".join(f"{x:.6f}" for x in css_matrix) + ")")
