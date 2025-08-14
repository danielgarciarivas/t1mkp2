# Arquitectura Modular - T1 Marketplace

## Estructura del Proyecto

```
src/
├── components/           # Componentes reutilizables
│   ├── common/          # Componentes UI básicos (Button, Input, Modal, Loading)
│   ├── layout/          # Componentes de layout (Header, Footer, Sidebar, Navigation)
│   └── forms/           # Componentes de formularios específicos
├── pages/               # Páginas principales de la aplicación
├── features/            # Funcionalidades organizadas por dominio de negocio
│   ├── auth/           # Autenticación y autorización
│   ├── products/       # Gestión de productos
│   └── cart/           # Carrito de compras
├── hooks/               # Custom hooks globales
├── services/            # APIs y servicios externos
├── store/               # Estado global (Redux/Zustand)
├── utils/               # Utilidades y helpers
├── constants/           # Constantes de la aplicación
├── types/               # TypeScript types (opcional)
└── styles/              # Estilos globales y themes
```

## Principios de la Arquitectura

### 1. Separación por Dominio (Feature-Based)
Cada feature contiene sus propios:
- **components/**: Componentes específicos del dominio
- **services/**: Lógica de API y servicios
- **hooks/**: Custom hooks específicos
- **store/**: Estado local del dominio

### 2. Componentes Reutilizables
- **common/**: Componentes UI básicos sin lógica de negocio
- **layout/**: Componentes estructurales de la aplicación
- **forms/**: Formularios reutilizables

### 3. Páginas como Orquestadores
Las páginas combinan componentes y features para crear vistas completas.

## Convenciones de Nomenclatura

- **PascalCase**: Componentes y páginas
- **camelCase**: Funciones, variables y hooks
- **UPPER_CASE**: Constantes
- **kebab-case**: Archivos CSS y carpetas cuando sea necesario

## Importaciones

```javascript
// Componentes comunes
import Button from 'components/common/Button';

// Features
import { useAuth } from 'features/auth/hooks';
import { ProductList } from 'features/products/components';

// Utilidades
import { formatPrice } from 'utils';
import { ROUTES } from 'constants';
```

## Ventajas de esta Arquitectura

1. **Escalabilidad**: Fácil agregar nuevas features sin afectar el código existente
2. **Mantenibilidad**: Código organizado por responsabilidades claras
3. **Reutilización**: Componentes y hooks compartidos entre features
4. **Testing**: Cada módulo puede ser testeado independientemente
5. **Colaboración**: Equipos pueden trabajar en features diferentes sin conflictos