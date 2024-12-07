document.addEventListener('alpine:init',() =>{
    Alpine.data('products',() => ({
        items:[
            {id: 1, name: 'Espresso', img: '1.jpg', price: 22000},
            {id: 2, name: 'Americano', img: '2.jpg', price: 22000},
            {id: 3, name: 'Long Black', img: '3.jpg', price: 25000},
            {id: 4, name: 'Caffela', img: '4.jpg', price: 25000},
            {id: 5, name: 'Mochaccino', img: '5.jpg', price: 28000},
            {id: 6, name: 'Brownella', img: '6.jpg', price: 28000},
            {id: 7, name: 'Sweet Choco', img: '7.jpg', price: 25000},
            {id: 8, name: 'Hazelnutella', img: '8.jpg', price: 28000},
        ],
    }));

    Alpine.store('cart',{
        items:[],
        total: 0,
        quantity: 0,
        add(newItem) {
            //cek apakah ada barang yang sama di cart
            const cartItem = this.items.find((item) => item.id === newItem.id);

            //jika belum ada atau cart masih kosong
            if(!cartItem){
                this.items.push({...newItem, quantity: 1, total: newItem.price });
                this.quantity++;
                this.total += newItem.price; 
            } else{
                //jika barang sudah ada, cek apakah barang beda atau sama dengan yang ada di cart
                this.items = this.items.map((item) => {
                    //jika barang berbeda
                    if(item.id !== newItem.id) {
                        return item;
                    } else {
                        //jika barang sudah ada, tambah quantity dan sub-totalnya
                        item.quantity++;
                        item.total = item.price*item.quantity;
                        this.quantity++;
                        this.total += item.price;
                        return item;
                    }
                });
            }
        },
        remove(id){
            //ambil item yang ingin diremove berdasarkan id nya
            const cartItem = this.items.find((item) => item.id === id);

            //jika item lebih dari 1
            if(cartItem.quantity > 1) {
                // telusuri satu per satu
                this.items = this.items.map((item) => {
                    //jika bukan barang yang di klik
                    if(item.id !== id) {
                        return item;
                    } else {
                        item.quantity--;
                        item.total = item.price * item.quantity;
                        this.quantity--;
                        this.total -= item.price;
                        return item;
                    }
                });
            } else if (cartItem.quantity === 1) {
                // jika barangnya sisa 1
                this.items = this.items.filter((item) => item.id !== id);
                this.quantity--;
                this.total -= cartItem.price;
            }
        },
        deleteAll() {
                // Mengosongkan keranjang
                this.items = [];
                this.quantity = 0;
                this.total = 0;
        }        
    });
});

// Konversi ke Rupiah
const rupiah = (number) => {
    return new Intl.NumberFormat('id-ID',{
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(number);
};

// Data produk dan nutrisi
const data = {
    labels: ['Espresso', 'Americano', 'Long Black', 'Caffela', 'Mochaccino', 'Brownella', 'Sweet Choco', 'Hazelnutella'],  // Nama produk
    datasets: [
      {
        label: 'Kalori',
        data: [200, 350, 150, 250, 200, 350, 150, 250],  // Nilai kalori
        backgroundColor: 'rgba(255, 99, 132, 0.8)',  // Warna bar kalori
        stack: 'Stack 1'  // Menentukan stack yang terpisah
      },
      {
        label: 'Gula',
        data: [30, 45, 20, 40, 30, 90, 20, 40],  // Nilai gula
        backgroundColor: 'rgba(54, 162, 235, 0.8)',  // Warna bar gula
        stack: 'Stack 2'  // Stack terpisah dari kalori
      }
    ]
  };
  
  // Menyortir data produk berdasarkan nilai kalori terbesar, kemudian gula terbesar
  const sortedData = data.labels
    .map((label, index) => ({
      label,
      kalori: data.datasets[0].data[index],  // Nilai kalori
      gula: data.datasets[1].data[index]     // Nilai gula
    }))
    .sort((a, b) => {
      // Pertama, urutkan berdasarkan kalori terbesar
      if (b.kalori !== a.kalori) return b.kalori - a.kalori;
      // Jika kalori sama, urutkan berdasarkan gula terbesar
      return b.gula - a.gula;
  });
  
  // Memperbarui data setelah sorting
  data.labels = sortedData.map(item => item.label);
  data.datasets[0].data = sortedData.map(item => item.kalori);
  data.datasets[1].data = sortedData.map(item => item.gula);
  
  // Konfigurasi chart
const config = {
  type: 'bar',
  data: data,
  options: {
    indexAxis: 'y', // Horizontal bar chart
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'white', // Warna teks legenda
          font: {
            weight: 'bold', // Ketebalan font legenda
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            // Menambahkan satuan (kkal untuk kalori, g untuk gula)
            if (tooltipItem.dataset.label === 'Kalori') {
              return tooltipItem.dataset.label + ': ' + tooltipItem.raw + ' kkal';
            } else if (tooltipItem.dataset.label === 'Gula') {
              return tooltipItem.dataset.label + ': ' + tooltipItem.raw + ' g';
            }
            return tooltipItem.dataset.label + ': ' + tooltipItem.raw;
          }
        }
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Nutrisi', // Label untuk sumbu X
          color: 'white', // Warna teks label sumbu X
        },
        ticks: {
          color: 'white', // Warna teks sumbu X
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.2)', // Warna garis grid sumbu X
        }
      },
      y: {
        title: {
          display: true,
          text: 'Produk', // Label untuk sumbu Y
          color: 'white', // Warna teks label sumbu Y
        },
        ticks: {
          color: 'white', // Warna teks nama produk
          font: {
            weight: 'bold', // Ketebalan font nama produk
            size: 14, // Ukuran font nama produk
          },
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.2)', // Warna garis grid sumbu Y
        }
      }
    }
  }
};

// Membuat chart setelah DOM siap
document.addEventListener("DOMContentLoaded", function() {
  const ctx = document.getElementById('nutritionChart').getContext('2d');
  new Chart(ctx, config); // Membuat chart menggunakan konfigurasi
});

  
