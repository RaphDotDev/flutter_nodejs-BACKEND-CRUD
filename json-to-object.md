# 🧠 Dart `map()` + `fromJson()` + JSON Parsing — A Visual Guide

---

## 🗸️ `map()` in Dart

> `.map()` transforms a list into another list by applying a function to each item.

```dart
final List<int> numbers = [1, 2, 3];
final doubled = numbers.map((n) => n * 2).toList();

print(doubled); // 👉 [2, 4, 6]
```

In JSON parsing, it's used like this:

```dart
final products = (jsonList as List)
  .map((e) => Product.fromJson(e))
  .toList();
```

---

## 📦 `fromJson()` — Convert Map ➔ Object

> `fromJson` turns a single `Map<String, dynamic>` (like JSON) into a Dart object.

```dart
class Product {
  final String id;
  final String name;
  final String price;
  final String desc;

  Product({required this.id, required this.name, required this.price, required this.desc});

  factory Product.fromJson(Map<String, dynamic> json) {
    return Product(
      id: json['_id'],
      name: json['pname'],
      price: json['pprice'],
      desc: json['pdesc'],
    );
  }
}
```

---

## 🧾 Example JSON

```json
[
  {
    "_id": "1",
    "pname": "iPhone",
    "pprice": "1000",
    "pdesc": "Smartphone"
  },
  {
    "_id": "2",
    "pname": "Android",
    "pprice": "500",
    "pdesc": "Another Smartphone"
  }
]
```

---

## 🔁 Convert JSON → Dart

### ✅ Using `map()` Directly

```dart
if (response.statusCode == 200) {
  var data = response.data;

  debugPrint("All Products: $data");

  return (data as List).map((e) => Product(
    name: e['pname'],
    price: e['pprice'].toString(),
    desc: e['pdesc'],
    id: e['_id'].toString(),
  )).toList();
} else {
  return [];
}
```

### ✅ Using `for` Loop

```dart
if (response.statusCode == 200) {
  var data = response.data;
  debugPrint("All Products: $data");

  List<Product> products = [];

  for (var e in data) {
    products.add(Product(
      name: e['pname'],
      price: e['pprice'].toString(),
      desc: e['pdesc'],
      id: e['_id'].toString(),
    ));
  }

  return products;
} else {
  return [];
}
```

---

## 🧝 What is an **Instance**?

> An **instance** is one actual object created from a class.

```dart
Product iphone = Product(
  id: "1",
  name: "iPhone",
  price: "1000",
  desc: "Smartphone"
);
```

🟢 `iphone` is an **instance** of the `Product` class.

---

## 🧠 Summary Table

| Concept    | Meaning                                 | Example                        |
| ---------- | --------------------------------------- | ------------------------------ |
| `map()`    | Transform every item in a list          | `.map((e) => ...)`             |
| `fromJson` | Convert `Map<String, dynamic>` → Object | `Product.fromJson(json)`       |
| Instance   | One real object created from a class    | `Product(name: "iPhone")`      |
| JSON List  | List of maps                            | `[{"name": "iPhone"}, ...]`    |
| Dart List  | List of objects                         | `[Product(...), Product(...)]` |

---

## 🧑‍💻 Bonus: Printing Products

```dart
for (var p in products) {
  print("📱 ${p.name} - 💰 \$${p.price} - 📝 ${p.desc}");
}
```

**Output:**

```
📱 iPhone - 💰 $1000 - 📝 Smartphone
📱 Android - 💰 $500 - 📝 Another Smartphone
```

---

## 📊 AuditTrailModel Example

### 📁 Sample JSON:

```json
[
  {
    "description": "Logged in",
    "createdAt": "2024-07-24T14:00:00Z",
    "coordinates": "14.5995,120.9842"
  },
  {
    "description": "Viewed profile",
    "createdAt": "2024-07-24T14:05:00Z",
    "coordinates": "14.6000,120.9850"
  }
]
```

### 💡 Model:

```dart
class AuditTrailModel {
  final String? description;
  final String? createdAt;
  final String? coordinates;

  AuditTrailModel({this.description, this.createdAt, this.coordinates});

  factory AuditTrailModel.fromJson(Map<String, dynamic> json) {
    return AuditTrailModel(
      description: json['description'],
      createdAt: json['createdAt'],
      coordinates: json['coordinates'],
    );
  }
}
```

### 🔄 Mapping to List:

```dart
final auditTrailModel = (response['rows'] as List)
    .map((e) => AuditTrailModel.fromJson(e))
    .toList();
```

### 🏘️ Example Output:

```dart
[
  AuditTrailModel(description: "Logged in", createdAt: "2024-07-24T14:00:00Z", coordinates: "14.5995,120.9842"),
  AuditTrailModel(description: "Viewed profile", createdAt: "2024-07-24T14:05:00Z", coordinates: "14.6000,120.9850")
]
```

### 📃 Optional UI Mapping Example:

```dart
cardActivity = auditTrailModel.map((model) {
  return {
    "title": model.description ?? '',
    "icon": getIcon(model.description ?? ''),
    "color": getColor(model.description ?? ''),
    "timeStamp": model.createdAt ?? '',
    "coordinates": model.coordinates ?? null,
  };
}).toList();
```
