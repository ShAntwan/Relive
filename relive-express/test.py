print('-2')
from matplotlib import pyplot as plt

from sklearn.datasets import make_checkerboard
print('-1')
n_clusters = (4, 3)
data, rows, columns = make_checkerboard(
    shape=(300, 300), n_clusters=n_clusters, noise=10, shuffle=False, random_state=42
)
print('1')
plt.matshow(data, cmap=plt.cm.Blues)
print('2')
plt.title("Original dataset")
print('3')
plt.savefig('checkerboard.png')

print("Checkerboard plot generated and saved as checkerboard.png")
